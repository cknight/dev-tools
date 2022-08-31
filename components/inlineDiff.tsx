/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { DiffTableRowResult } from "../util/diffModel.ts";

export interface DiffProps {
  diffContent: DiffTableRowResult[] | undefined;
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

  return (
    <div id="inline-container" class={tw`(${props.diffContent ? '' : 'hidden'}) flex`}>
      {inlineDiff && 
        <Fragment>
          <div class="td-table-container line-by-line">
            <table class="td-table">
            <tbody>
              {inlineDiff.map(row => {
                return (
                  <tr>
                    <td scope="row" class="fit-column line-number-col-left">{row.leftContent?.lineNumber}</td>
                    <td scope="row" class="fit-column line-number-col">{row.rightContent?.lineNumber}</td>
                    <td class={"fit-column prefix-col" + (row.leftContent?.prefix === '-' ? ' delete-row' :  '') + (row.rightContent?.prefix === '+' ? ' insert-row' : '')}>
                      <span>{ row.leftContent?.prefix || row.rightContent?.prefix || ' ' }</span>
                    </td>
                    {!row.hasDiffs &&
                      <td class={"content-col" + (row.leftContent?.prefix === '-' ? ' delete-row' : '') + (row.rightContent?.prefix === '+' ? ' insert-row' : '')}>
                        <span><pre>{row.leftContent?.lineContent}</pre></span>
                      </td>
                    }
                    {row.hasDiffs && row.leftContent && row.leftContent?.lineDiffs.length !== 0 &&
                      <td class={"content-col" + (row.leftContent?.prefix === '-' ? ' delete-row' : '') + (row.rightContent?.prefix === '+' ? ' insert-row':'')}>
                        {row.leftContent?.lineDiffs.map(diff => {
                          return (
                            <span><pre class={tw`inline ${diff.isDiff ? 'highlight' : ''}`}>{diff.content}</pre></span>                            
                          );
                        })}
                      </td>
                    }
                    {row.hasDiffs && row.rightContent && row.rightContent?.lineDiffs.length !== 0 &&
                      <td class={"content-col" + (row.leftContent?.prefix === '-' ? ' delete-row' : '') + (row.rightContent?.prefix === '+' ? ' insert-row':'')}>
                        {row.rightContent?.lineDiffs.map(diff => {
                          return (
                            <span><pre class={tw`inline ${diff.isDiff ? 'highlight' : ''}`}>{diff.content}</pre></span>                            
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