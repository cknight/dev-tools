import { DiffTableRowResult } from "../util/diffModel.ts";
import { DiffType } from "./diffOutput.tsx";
import { deleteColor, deleteHighlight, fitColumn, insertColor, insertHighlight, lineNumberCol, lineNumberColLeft } from "../util/styles.ts";
import { Fragment } from "preact/jsx-runtime";

export interface DiffProps {
  diffContent: DiffTableRowResult[] | undefined;
  diffType: DiffType;
}

export function InlineDiff(props: DiffProps) {

  const inlineDiff = props.diffContent?.reduce((tableLineByLine: DiffTableRowResult[], row: DiffTableRowResult) => {
    if (!tableLineByLine) {
      tableLineByLine = [];
    }
    if (row.hasDiffs) {
      if (row.leftContent) {
        tableLineByLine.push({
          leftContent: row.leftContent,
          rightContent: null,
          belongTo: row.belongTo,
          hasDiffs: true,
          numDiffs: row.numDiffs,
        });
      }
      if (row.rightContent) {
        tableLineByLine.push({
          leftContent: null,
          rightContent: row.rightContent,
          belongTo: row.belongTo,
          hasDiffs: true,
          numDiffs: row.numDiffs,
        });
      }
    } else {
      tableLineByLine.push(row);
    }

    return tableLineByLine;
  }, []);

  const showDiff = props.diffContent && props.diffType == 'inline';

  return (
    <div id="inline-container" class={`${showDiff ? '' : 'hidden'} flex`} style="flex-grow:1">
      { showDiff && inlineDiff && 
        <Fragment>
          <div class="overflow-auto w-full max-w-full">
            <table class="border border-gray-800 w-full max-w-full">
            <tbody>
              {inlineDiff.map(row => {
                return (
                  <tr>
                    <td scope="row" class={`${fitColumn} ${lineNumberColLeft}`}>{row.leftContent?.lineNumber}</td>
                    <td scope="row" class={`${fitColumn} ${lineNumberCol}`}>{row.rightContent?.lineNumber}</td>
                    <td class={`${fitColumn} prefix-col ${row.leftContent?.prefix === '-' ? deleteColor :  ''} ${row.rightContent?.prefix === '+' ? insertColor: ''}`}>
                      <span>{ row.leftContent?.prefix || row.rightContent?.prefix || ' ' }</span>
                    </td>
                    {!row.hasDiffs &&
                      <td class={`content-col ${row.leftContent?.prefix === '-' ? deleteColor : ''} ${row.rightContent?.prefix === '+' ? insertColor : ''}`}>
                        <pre class="whitespace-pre-wrap break-words text-xs">{row.leftContent?.lineContent}</pre>
                      </td>
                    }
                    {row.hasDiffs && row.leftContent && row.leftContent?.lineDiffs.length !== 0 &&
                      <td class={`content-col ${row.leftContent?.prefix === '-' ? deleteColor : ''} ${row.rightContent?.prefix === '+' ? insertColor:''}`}>
                        {row.leftContent?.lineDiffs.map(diff => {
                          return (
                            <pre class={`whitespace-pre-wrap break-words text-xs inline ${diff.isDiff ? deleteHighlight : ''}`}>{diff.content}</pre>
                          );
                        })}
                      </td>
                    }
                    {row.hasDiffs && row.rightContent && row.rightContent?.lineDiffs.length !== 0 &&
                      <td class={`content-col ${row.leftContent?.prefix === '-' ? deleteColor : ''} ${row.rightContent?.prefix === '+' ? insertColor:''}`}>
                        {row.rightContent?.lineDiffs.map(diff => {
                          return (
                            <pre class={`whitespace-pre-wrap break-words text-xs inline ${diff.isDiff ? insertHighlight : ''}`}>{diff.content}</pre>
                          );
                        })}
                      </td>
                    }
                  </tr>
                );
              })}
            </tbody>
            </table>
          </div>
        </Fragment>
      }
    </div>
  );
}