<script lang="ts">
    import { Wheel } from "spin-wheel"
    import { onDestroy, onMount } from "svelte";
    import { cubicOut } from "svelte/easing";

    let wheel: Wheel | null = null;
    let choice_winner: string = $state("")
    let is_spinning: boolean = false;
    const wheel_content = {
      items: [
        {
          label: 'Portal 2',
          backgroundColor: getColor(0),
        },
        {
          label: 'Worms W.M.D.',
          backgroundColor: getColor(1),
        },
        {
          label: 'Stick Fight: The Game',
          backgroundColor: getColor(2),
        },
        {
          label: 'Hollow Knight',
          backgroundColor: getColor(3),
        },
        {
          label: 'Uno Infinity',
          backgroundColor: getColor(4),
        },
        {
          label: 'The Stanley Parable: Ultra Deluxe',
          backgroundColor: getColor(5),
        },
      ]
    };

    onMount(() => {
      const container = document.querySelector('.wheel-container');
      wheel = new Wheel(container, wheel_content);
      wheel.pointerAngle = 90;
      wheel.isInteractive = false;
      wheel.onSpin = (event) => {
        choice_winner = "";
        is_spinning = true;
      }
      wheel.onRest = (event) => {
        choice_winner = wheel.items[event.currentIndex].label;
        is_spinning = false;
      };
    })

    onDestroy(() => {
      wheel.remove();
    })

    function spinWheel(){
      if (wheel != null) {
        if (is_spinning) return;
        const random = Math.floor(Math.random() * wheel.items.length)
        wheel.spinToItem(random, 8*1000, true, 10, 1, cubicOut);
      }
    }

    function getColor(current_int: number): string{
      const result = current_int % 4;
      if (result === 0) return "red";
      else if (result === 1) return "blue";
      else if (result === 2) return "green";
      return "yellow";
    }

    function refreshValues(){
      if (wheel != null) {
        let items: any[] = [];
        const possible_values: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("values");
        const values: string[] = possible_values.value.split("\n");
        if (values.length > 0){
          values.forEach(value => {
            if (value.replaceAll(" ", "") != "") items.push({label: value, backgroundColor: getColor(items.length)})
          });
        }
        wheel.items = items;
      }
    }

</script>


<div class="w-full h-full flex flex-row items-center justify-center">
    <div class="wheel-container w-6/10 h-8/10"></div>

    <div class="w-3/10 h-8/10 flex flex-col items-center justify-center">
        <div class="w-auto h-auto flex flex-row items-center justify-center">
            <button class="bg-blue-700 py-1 px-4 my-1 mx-2 rounded-xl cursor-pointer" onclick={spinWheel}>Spin the wheel</button>
            <button class="bg-blue-700 py-1 px-4 my-1 mx-2 rounded-xl cursor-pointer" onclick={refreshValues}>Refresh Values</button></div>
        <h3 class="text-4xl mt-5">Wheel Values: </h3>
        <textarea name="values" id="values" class="bg-white text-black h-6/10 w-full mt-2" placeholder="Replace me with text">Portal 2
Worms W.M.D.
Stick Fight: The Game
Hollow Knight
Uno Infinity
The Stanley Parable: Ultra Deluxe</textarea>
        {#if choice_winner != ""}
            <h3 class="text-4xl mt-2">Winner is: "{choice_winner}"</h3>
        {:else}
            <h3 class="text-4xl mt-2">No winner yet.</h3>
        {/if}
    </div>
</div>
