<script lang="ts">
    import type { Stream } from "$lib/interfaces/schedule/Schedule";
    import type { PageData } from "./$types";
    import { SignOut } from "@auth/sveltekit/components";
    import { getMonth, isFuture, isNow, isPast } from "$lib/functions/schedule/streamsInfo";
    import { z } from "$lib/functions/funny_points_leaderboard/Time";

    const { data } = $props<{
        data: PageData;
    }>();

    const streams: Stream[] = $state(data.streams);

    let menu: string = $state("scheduled");
    let message_added: string = $state("")

    //const backend_url = "http://127.0.0.1:8787";
    const backend_url = "https://thefox580-backend.zoelliotmitong.workers.dev";

    function formatDate(date: string): string{
      const now: Date = new Date();
      return date + ":00.000" + (-now.getTimezoneOffset() / 60 < 0
          ? ""
          : "+" + z(-now.getTimezoneOffset() / 60) + ":" + z(Math.abs(now.getTimezoneOffset()) % 60))
    }

    function sortStreams(){
      streams.sort((a, b) => {
        return (a.time < b.time ? -1 : (b.time < a.time ? 1 : (a.estimated_length < b.estimated_length ? -1 : (b.estimated_length < a.estimated_length ? 1 : 0))))
      })
    }

    async function addStream(){

      const title = (<HTMLInputElement>document.getElementById("title")).value
      const category = (<HTMLInputElement>document.getElementById("category")).value;

      const stream_date = <HTMLInputElement>document.getElementById("stream-time");
      const time = new Date(formatDate(stream_date.value)).getTime()/1000;

      const estimated_length = parseInt((<HTMLInputElement>document.getElementById("duration")).value)
      const image_name = (<HTMLInputElement>document.getElementById("image")).value;
      const channel = (<HTMLInputElement>document.getElementById("channel")).value;

      if (title && category && time && estimated_length && image_name){
        const stream: Stream = {
          category,
          channel,
          estimated_length,
          image_name,
          time,
          title
        }
        await fetch(backend_url + "/api/schedule", {
          method: "POST",
          headers: {
            "x-twitch-id": data.session.providerAccountId,
            "content-type": "application/json",
          },
          body: JSON.stringify(stream)
          });
        streams.push(stream);
        sortStreams();
        message_added = `"${stream.title}" has been added. Check "Stream Schedule" to see it.`
      }
    }

    async function removeStream(stream: Stream){
      await fetch(backend_url + "/api/schedule", {
        method: "DELETE",
        headers: {
          "x-twitch-id": data.session.providerAccountId,
          "content-type": "application/json",
        },
        body: JSON.stringify(stream)
      });
      sortStreams();
    }
</script>


<svelte:head>
    <link rel="stylesheet" href="/styles/schedule/schedule.css" />
    <title>Editing Stream Schedule</title>
</svelte:head>

<div class="w-full h-screen flex flex-col">
    <div class="w-full h-6 flex justify-center items-center my-5">
        <span class="mr-5 text-center text-white"
            >Signed in as {data.session.user.name}</span
        >
        <SignOut
            signOutPage="api/twitch/signout"
            options={{ redirectTo: "/schedule" }}
        >
            <span
                slot="submitButton"
                class="p-2.5 border-4 border-purple-800 rounded-xl bg-purple-500 text-center text-white cursor-pointer"
                >Sign Out</span
            >
        </SignOut>
    </div>
    <div class="w-full h-6 flex justify-center items-center my-5">
        <button
            class="rounded-xl mx-3 py-2 px-1 bg-blue-600 cursor-pointer"
            style="filter: grayscale({menu === "scheduled" ? "0" : "1"});"
            onclick={() => {
              menu = "scheduled";
              message_added = "";
            }}
        >Scheduled Streams</button>
        <button
            class="rounded-xl mx-3 py-2 px-1 bg-blue-600 cursor-pointer"
            style="filter: grayscale({menu === "editing" ? "0" : "1"});"
            onclick={() => {
              menu = "editing";
              message_added = "";
            }}
        >Edit Streams</button>
    </div>
    <div class="w-auto h-auto">
        {#if menu === "scheduled"}
          {#each streams as stream, index}
              <div class="flex flex-row items-center w-full h-auto">
                <a href="https://www.twitch.tv/{stream.channel}" target="_blank" class="w-full mx-2">
                    <div class="{isNow(stream) ? "live" : (isPast(stream) ? "past" : "future")} w-full flex flex-row items-center justify-center px-2 py-5 my-5 rounded-2xl border-4"
                        >
                        <div class="w-8/10 h-auto text-white flex flex-col items-center justify-center mx-5 text-center">
                            {#if isNow(stream)}
                                <p class="text-2xl text-red-600 font-bold">🔴 LIVE</p>
                            {:else if isFuture(stream)}
                                <p class="text-2xl text-green-400">🟢 Upcoming</p>
                            {:else}
                                <p class="text-2xl text-green-400">🟢 Done</p>
                            {/if}
                            <p class="text-4xl">{stream.title}</p>
                            <p class="text-3xl">{stream.category}</p>
                            <p class="text-2xl">{getMonth(new Date(stream.time*1000).getMonth())} {new Date(stream.time*1000).getDate()} from {z(new Date(stream.time*1000).getHours())}:{z(new Date(stream.time*1000).getMinutes())} to {z(new Date((stream.time+stream.estimated_length*60)*1000).getHours())}:{z(new Date((stream.time+stream.estimated_length*60)*1000).getMinutes())}</p>
                        </div>
                        <img src="/img/schedule/{stream.image_name}" alt={stream.image_name} class="w-60 rounded-xl h-36"/>
                    </div>
                </a>
                <button class="bg-red-500 py-1 px-2 mx-2 rounded-xl cursor-pointer h-full" onclick={() => {
                    removeStream(stream);
                    streams.splice(index, 1);
                    sortStreams();
                }}>Delete Stream</button>

              </div>
          {/each}
        {:else}
        <div class="w-120 h-full flex flex-col items-center justify-center">
            <p class="text-4xl my-5">Add a new stream:</p>
            <div
                class="flex flex-row justify-between items-center w-full"
            >
                <label for="title">Title : </label>
                <input
                    type="text"
                    placeholder="Stream Title"
                    id="title"
                    value=""
                    required
                    class="border-gray-400 border-2 rounded-xl my-1 p-1"
                />
            </div>
            <div
                class="flex flex-row justify-between items-center w-full"
            >
                <label for="category">Category : </label>
                <input
                    type="text"
                    placeholder="Category from Twitch"
                    id="category"
                    value=""
                    required
                    class="border-gray-400 border-2 rounded-xl my-1 p-1"
                />
            </div>
            <div
                class="flex flex-row justify-between items-center w-full"
            >
                <label for="stream-time">Stream time : </label>
                <input
                    type="datetime-local"
                    placeholder="Stream Time"
                    id="stream-time"
                    value=""
                    required
                    class="border-gray-400 border-2 rounded-xl my-1 p-1"
                />
            </div>
            <div
                class="flex flex-row justify-between items-center w-full"
            >
                <label for="duration"
                    >Estimated Duration (in minutes) :</label
                >
                <input
                    type="numeric"
                    placeholder="Estimated duration"
                    id="duration"
                    value=""
                    required
                    class="border-gray-400 border-2 rounded-xl my-1 p-1"
                />
            </div>
            <div
                class="flex flex-row justify-between items-center w-full"
            >
                <label for="image">Image name : </label>
                <input
                    type="text"
                    placeholder="Image from /static/img"
                    id="image"
                    value=""
                    required
                    class="border-gray-400 border-2 rounded-xl my-1 p-1"
                />
            </div>
            <div
                class="flex flex-row justify-between items-center w-full"
            >
                <label for="channel">Channel name : </label>
                <input
                    type="text"
                    placeholder="Twitch Username"
                    id="channel"
                    value=""
                    required
                    class="border-gray-400 border-2 rounded-xl my-1 p-1"
                />
            </div>
        </div>
        <div class="flex flex-col justify-center items-center mx-2">
            <button
                title="Add stream"
                class="cursor-pointer px-3 py-1 bg-green-500 rounded-2xl mt-2"
                onclick={async () => {
                  await addStream();
                }}
                >Add stream</button
            >
            {#if message_added}
                <p class="text-2xl text-green-500">{message_added}</p>
            {/if}
        </div>
        {/if}
    </div>
</div>
