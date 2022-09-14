import { DiffTableRowResult } from "../util/diffModel.ts";
import { DiffType } from "./diffOutput.tsx";
import { deleteColor, deleteHighlight, emptyRow, fitColumn, insertColor, insertHighlight, lineNumberCol } from "../util/styles.ts";
import { Fragment } from "preact/jsx-runtime";

export interface DiffProps {
  diffContent: DiffTableRowResult[] | undefined;
  diffType: DiffType;
}

export function SideBySideDiff(props: DiffProps) {

  const showDiff = props.diffContent && props.diffType == 'sideBySide';

  return (
    <div id="side-by-side-container" class={`${showDiff ? '' : 'hidden'} `}>
      {showDiff && props.diffContent && 
        <Fragment>
          <div class="w-full max-w-full">
            <table class="border border-gray-400 w-full max-w-full">
            <tbody>
              {props.diffContent.map(row => {
                return (
                  <tr style="line-height:normal">
                    <td
                      scope="row"
                      class={`${row.leftContent?.prefix === '-' ? deleteColor : ''} ${!row.leftContent?.lineContent ? emptyRow : ''} ${fitColumn} ${lineNumberCol}`}
                    >
                      { row.leftContent?.lineNumber !== -1 ? row.leftContent?.lineNumber : ' ' }
                    </td>
                    <td
                      class={`${row.leftContent?.prefix === '-' ? deleteColor : ''} ${!row.leftContent?.lineContent ? emptyRow : ''} ${fitColumn}`}
                    >
                      <span class="px-2.5">{ row.leftContent?.prefix || ' ' }</span>
                    </td>

                    {!row.hasDiffs && 
                      <td class={`${row.leftContent?.prefix === '-' ? deleteColor : ''} ${!row.leftContent?.lineContent ? emptyRow : ''} w-2/4`}>
                        <pre class="whitespace-pre-wrap break-words text-xs" style="overflow-wrap: anywhere">{row.leftContent?.lineContent}</pre>
                      </td>
                    }

                    {row.hasDiffs && 
                      <td class={`${row.leftContent?.prefix === '-' ? deleteColor : ''} ${!row.leftContent?.lineContent ? emptyRow : ''} w-2/4`}>
                        {
                          row.leftContent?.lineDiffs.map(diff => {
                            return (
                              <pre class={`whitespace-pre-wrap break-words text-xs inline ${diff.isDiff ? deleteHighlight : ''}`} style="overflow-wrap: anywhere">{diff.content}</pre>
                            );
                          })
                        }
                      </td>
                    }
                      <td
                        scope="row"
                        class={`${row.rightContent?.prefix === '+' ? insertColor : ''} ${!row.rightContent?.lineContent ? emptyRow : ''} ${fitColumn} ${lineNumberCol}`}
                      >
                        { row.rightContent?.lineNumber !== -1 ? row.rightContent?.lineNumber : ' ' }
                      </td>
                      <td
                        class={`${row.rightContent?.prefix === '+' ? insertColor : ''} ${!row.rightContent?.lineContent ? emptyRow : ''} ${fitColumn}`}
                      >
                        <span class="px-2.5">{ row.rightContent?.prefix || ' ' }</span>
                      </td>

                      {!row.hasDiffs &&
                        <td class={`${row.rightContent?.prefix === '+' ? insertColor : ''} ${!row.rightContent?.lineContent ? emptyRow : ''} w-2/4`}>
                          <pre class="whitespace-pre-wrap break-words text-xs" style="overflow-wrap: anywhere">{row.rightContent?.lineContent}</pre>
                        </td>
                      }

                      {row.hasDiffs && 
                        <td class={`${row.rightContent?.prefix === '+' ? insertColor : ''} ${!row.rightContent?.lineContent ? emptyRow : ''} w-2/4`}>
                          {row.rightContent?.lineDiffs.map(diff => {
                            return (
                            <pre class={`whitespace-pre-wrap break-words text-xs inline ${diff.isDiff ? insertHighlight : ''}`} style="overflow-wrap: anywhere">{diff.content}</pre>
                            );
                          })}
                        </td>
                      }
                    </tr>
                  )})}
              </tbody>
            </table>              
          </div>
        </Fragment>
      }
    </div>
  );
}
