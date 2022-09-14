import { useRef, useState } from "preact/hooks";
import { registry } from "../util/encoderRegistry.ts";
import { EncoderRegistryEntry } from "../types.ts";
import { Toast } from "../components/toast.tsx";
import { labelStyle } from "../util/styles.ts";

export default function EncoderDecoder() {
  const inputRef = useRef(null);
  const encodingTypeRef = useRef(null);
  const [output, setOutput] = useState("");
  const [typeConfig, setTypeConfig] = useState<EncoderRegistryEntry>(registry[0]);
  const [fade, setFade] = useState(false);
  const [outputError, setOutputError] = useState(false);

  //@ts-ignore - value DOES exist on this input
  const selectedValue = encodingTypeRef?.current?.options[encodingTypeRef.current.selectedIndex].value;

  function processInput() {
    //@ts-ignore - value DOES exist on this input
    const input = inputRef?.current?.value;
    //@ts-ignore - value DOES exist on this input
    const selectedType = encodingTypeRef!.current!.value;
    const typeConfig = registry.find(e => e.selectValue === selectedType)!;

    if (input == "") {
      setOutput("");
      setOutputError(false);
    } else if (!typeConfig.isValidInput(input)) {
      setOutput("Input data is not of type: " + typeConfig.inputLabel);
      setOutputError(true);
    } else {
      const result = typeConfig.encoder(input);
      if (typeof result === 'string') {
        setOutput(result);
      } else {
        setOutput(result.msg + "\n\n" + result.err);
      }
      setOutputError(false);
    }
  }

  function encodingTypeChange() {
    //@ts-ignore - value does exist on this element
    const encodingType = encodingTypeRef!.current!.value;
    setTypeConfig(registry.find(e => e.selectValue === encodingType)!);
    processInput();
  }

  
  function copyToClipboard() {
    navigator.clipboard.writeText(output);
    showToast();
  }

  function showToast() {
    setFade(true);
    setTimeout(() => {
      setFade(false);
    }, 3000)
  }

  return (
    <div class="mt-12 max-w-7xl mx-auto py-6 sm:px-3 lg:px-8 px-4 py-6 sm:px-0 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label for="small" class={`${labelStyle}`}>Encoding type</label>
      <select id="encodingType" 
          ref={encodingTypeRef} 
          onChange={() => encodingTypeChange()} 
          class="block p-2 mb-6 text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
        {registry.map(entry => 
          <option value={entry.selectValue}>{entry.displayName}</option>
        )}
      </select>
      <p class={`text-red-600 text-sm ${selectedValue == 'JWT-decode' ? '' : 'hidden'}`}>WARNING: Decoded JWT content should not be trusted as the signature has not been verified.  Visit <a class="text-blue underline" href="https://jwt.io">jwt.io</a> to validate the signature.</p>
      <label for="input" class={`${labelStyle} mt-4`}>Input ({typeConfig.inputLabel}):</label>
      <textarea id="input" ref={inputRef} class="font-mono text-sm w-full h-40 p-3" onInput={() => processInput()}/>
      <label for="output" class={`${labelStyle}`}>Output ({typeConfig.outputLabel}):</label>
      <textarea id="output" readonly class={`font-mono w-full h-40 p-3 cursor-pointer text-sm ${outputError ? 'text-red-600': ''}`} value={output} onClick={() => copyToClipboard()}/>
      <Toast id="outputCopiedToast" message="Output copied to clipboard" fade={fade} type="info"/>
   </div>
  );
}