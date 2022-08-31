/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { useState } from "preact/hooks";
import { DiffTableRowResult } from "../util/diffModel.ts";
import { diff } from "https://deno.land/std@0.132.0/testing/_diff.ts";
import { IS_BROWSER } from "https://deno.land/x/fresh@1.0.0/runtime.ts";

export interface DiffProps {
  diffContent: DiffTableRowResult[] | undefined;
}

export function SideBySideDiff(props: DiffProps) {

  function syncScroll(elements:HTMLElement[]) {
    elements.forEach(el => el.addEventListener("scroll", ev => {
      elements.forEach(subEl => {
        subEl.scrollTop = el.scrollTop;
        subEl.scrollLeft = el.scrollLeft;
      });
    }));
  }

  if (IS_BROWSER) {
    setTimeout(() => {
      syncScroll([document.getElementById('sbs-left-compare-container')!, document.getElementById('sbs-right-compare-container')!]);
    });
  }

  return (
    <div id="side-by-side-container" class={tw`(${props.diffContent ? '' : 'hidden'}) flex`}>
      {props.diffContent && 
        <Fragment>
          <div class="td-table-container side-by-side" id="sbs-left-compare-container">
            <table class="td-table">
            <tbody>
              {props.diffContent.map(row => {
                return (
                  <tr>
                    <td
                      scope="row"
                      class={(row.leftContent?.prefix === '-' ? 'delete-row ' : ' ') +  (!row.leftContent?.lineContent ? 'empty-row ' : ' ') + 'fit-column line-number-col'}
                    >
                      { row.leftContent?.lineNumber !== -1 ? row.leftContent?.lineNumber : ' ' }
                    </td>
                    <td
                      class={(row.leftContent?.prefix === '-' ? 'delete-row ' : ' ') +  (!row.leftContent?.lineContent ? 'empty-row ' : ' ') + 'fit-column prefix-col'}
                    >
                      <span>{ row.leftContent?.prefix || ' ' }</span>
                    </td>

                    {!row.hasDiffs && 
                      <td class={(row.leftContent?.prefix === '-' ? 'delete-row ' : ' ') +  (!row.leftContent?.lineContent ? 'empty-row ' : ' ') +"content-col"}>
                        <span><pre>{row.leftContent?.lineContent}</pre></span>
                      </td>
                    }

                    {row.hasDiffs && 
                      <td class={(row.leftContent?.prefix === '-' ? 'delete-row ' : ' ') +  (!row.leftContent?.lineContent ? 'empty-row ' : ' ') +"content-col"}>
                        {
                          row.leftContent?.lineDiffs.map(diff => {
                            return (
                              <span><pre class={tw`inline ${diff.isDiff ? 'highlight' : ''}`}>{diff.content}</pre></span>
                            );
                          })
                        }
                      </td>
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          <div class="td-table-container side-by-side" id="sbs-right-compare-container">
            <table class="td-table">
              <tbody>
                {props.diffContent.map(row => {
                  return ( 
                    <tr>
                      <td
                        scope="row"
                        class={(row.rightContent?.prefix === '+' ? 'insert-row ' : ' ') + (!row.rightContent?.lineContent ? 'empty-row ' : ' ') + "fit-column line-number-col"}
                      >
                        { row.rightContent?.lineNumber !== -1 ? row.rightContent?.lineNumber : ' ' }
                      </td>
                      <td
                        class={(row.rightContent?.prefix === '+' ? 'insert-row ' : ' ') + (!row.rightContent?.lineContent ? 'empty-row ' : ' ') + "fit-column prefix-col"}
                      >
                        <span>{ row.rightContent?.prefix || ' ' }</span>
                      </td>

                      {!row.hasDiffs &&
                        <td class={(row.rightContent?.prefix === '+' ? 'insert-row ' : ' ') + (!row.rightContent?.lineContent ? 'empty-row ' : ' ') + "content-col"}>
                          <span><pre>{row.rightContent?.lineContent}</pre></span>
                        </td>
                      }

                      {row.hasDiffs && 
                        <td class={(row.rightContent?.prefix === '+' ? 'insert-row ' : ' ') + (!row.rightContent?.lineContent ? 'empty-row ' : ' ') + "content-col"}>
                          {row.rightContent?.lineDiffs.map(diff => {
                            return (
                            <span><pre class={tw`inline ${diff.isDiff ? 'highlight' : ''}`}>{diff.content}</pre></span>
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