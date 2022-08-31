// Credit: https://github.com/ABenassi87/ngx-text-diff/tree/master/projects/ngx-text-dif
// Credit: https://github.com/google/diff-match-patch

import { DiffLineResult, DiffPart, DiffTableRowResult } from "../util/diffModel.ts";
import { Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, diff_match_patch } from "https://cdn.skypack.dev/diff-match-patch?dts";

export function textDiff(left:string, right: string): DiffTableRowResult[] {
  return formatOutput(diff_lineMode(left, right));
}

const dmp = new diff_match_patch();

function diff_lineMode(text1:string, text2:string): Diff[] {
  const a = dmp.diff_linesToChars_(text1, text2);
  const lineText1 = a.chars1;
  const lineText2 = a.chars2;
  const lineArray = a.lineArray;
  const diffs = dmp.diff_main(lineText1, lineText2, false);
  dmp.diff_charsToLines_(diffs, lineArray);
  //dmp.diff_cleanupSemantic(diffs);
  return diffs;
}

function formatOutput(diffs: Diff[]): DiffTableRowResult[] {
  let lineLeft = 1;
  let lineRight = 1;
  return diffs.reduce((rows: DiffTableRowResult[], diff: Diff) => {
    if (!rows) {
      rows = [];
    }
    const diffType: number = diff[0];
    const diffValue: string = diff[1];
    let leftDiffRow: DiffTableRowResult | undefined = undefined;
    let rightDiffRow: DiffTableRowResult | undefined = undefined;
    let leftContent: DiffLineResult | null = null;
    let rightContent: DiffLineResult | null = null;
    let rowTemp: DiffTableRowResult | null = null;
    switch (diffType) {
      case DIFF_EQUAL: // 0
        diffValue
          .split('\n')
          .filter((value, index, array) => {
            if (index === array.length - 1) {
              return !isEmpty(value);
            }
            return true;
          })
          .forEach(line => {
            leftContent = {
              lineNumber: lineLeft,
              lineContent: line,
              lineDiffs: [],
              prefix: ''
            };
            rightContent = {
              lineNumber: lineRight,
              lineContent: line,
              lineDiffs: [],
              prefix: ''
            };
            rowTemp = {
              leftContent,
              rightContent,
              belongTo: 'both',
              hasDiffs: false,
              numDiffs: 0,
            };
            rows.push(rowTemp);
            lineRight = lineRight + 1;
            lineLeft = lineLeft + 1;
          });
        break;
      case DIFF_DELETE: // -1
        diffValue
          .split('\n')
          .filter((value, index, array) => {
            if (index === array.length - 1) {
              return !isEmpty(value);
            }
            return true;
          })
          .forEach(line => {
            rightDiffRow = rows.find(
              row => !row.leftContent && row.rightContent && row.rightContent.lineNumber === lineLeft && row.rightContent.prefix !== ''
            );
            leftContent = {
              lineNumber: lineLeft,
              lineContent: line,
              lineDiffs: [{ content: line, isDiff: true }],
              prefix: '-'
            };
            if (rightDiffRow) {
              rightDiffRow.leftContent = leftContent;
              rightDiffRow.leftContent.lineDiffs = getDiffParts(
                rightDiffRow.leftContent.lineContent,
                rightDiffRow.rightContent!.lineContent
              );
              rightDiffRow.rightContent!.lineDiffs = getDiffParts(
                rightDiffRow.rightContent!.lineContent,
                rightDiffRow.leftContent.lineContent
              );
              rightDiffRow.belongTo = 'both';
              rightDiffRow.numDiffs = countDiffs(rightDiffRow);
            } else {
              rows.push({
                leftContent,
                rightContent: null,
                hasDiffs: true,
                belongTo: 'left',
                numDiffs: 1,
              });
            }
            lineLeft = lineLeft + 1;
          });
        break;
      case DIFF_INSERT: // 1
        diffValue
          .split('\n')
          .filter((value, index, array) => {
            if (index === array.length - 1) {
              return !isEmpty(value);
            }
            return true;
          })
          .forEach(line => {
            leftDiffRow = rows.find(
              row => row.leftContent && !row.rightContent && row.leftContent.lineNumber === lineRight && row.leftContent.prefix !== ''
            );
            rightContent = {
              lineNumber: lineRight,
              lineContent: line,
              lineDiffs: [{ content: line, isDiff: true }],
              prefix: '+'
            };
            if (leftDiffRow) {
              leftDiffRow.rightContent = rightContent;
              leftDiffRow.leftContent!.lineDiffs = getDiffParts(
                leftDiffRow.leftContent!.lineContent,
                leftDiffRow.rightContent.lineContent
              );
              leftDiffRow.rightContent.lineDiffs = getDiffParts(
                leftDiffRow.rightContent.lineContent,
                leftDiffRow.leftContent!.lineContent
              );
              leftDiffRow.belongTo = 'both';
              leftDiffRow.numDiffs = countDiffs(leftDiffRow);
            } else {
              rows.push({
                leftContent: null,
                rightContent,
                hasDiffs: true,
                belongTo: 'right',
                numDiffs: 1,
              });
            }
            lineRight = lineRight + 1;
          });
        break;
    }
    return rows;
  }, []);
}

function countDiffs(result: DiffTableRowResult): number {
  let diffCount = 0;
  if (result.leftContent) {
    diffCount += result.leftContent.lineDiffs.filter(diff => diff.isDiff).length;
  }
  if (result.leftContent) {
    diffCount += result.rightContent!.lineDiffs.filter(diff => diff.isDiff).length;
  }
  return diffCount;
}

function getDiffParts(value: string, compareValue: string): DiffPart[] {
  const diffParts: DiffPart[] = [];

  const diffs = dmp.diff_main(value, compareValue);
  dmp.diff_cleanupSemantic(diffs);
  for (const [type, val] of diffs) {
    if (type != 1) diffParts.push({content: val, isDiff: type!=0});
  }

  return diffParts;
}

const isEmpty = (val: string|null) => val == null || !(Object.keys(val) || val).length || (Object.keys(val) || val).length === 0;