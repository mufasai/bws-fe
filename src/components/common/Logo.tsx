<<<<<<< HEAD
import { Component } from "solid-js";

export const Logo: Component<{ class?: string }> = (props) => {
  return (
    <div class={`flex items-center space-x-2 ${props.class || ''}`}>
      <img src="/work_hub_icon.svg" alt="work hub" class="w-10 h-10" />
      <h1 class="text-[3vh] font-bold font-inter">Work Hub</h1>
    </div>
  );
=======
import { Component } from "solid-js";

export const Logo: Component<{ class?: string }> = (props) => {
  return (
    <div class={`flex items-center space-x-2 ${props.class || ''}`}>
      <img src="/work_hub_icon.svg" alt="work hub" class="w-10 h-10" />
      <h1 class="text-[3vh] font-bold font-inter">Work Hub</h1>
    </div>
  );
>>>>>>> 6f6949f4938d86ba0e2c06119519abfba8adc3d1
}; 