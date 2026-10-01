<script lang="ts">
    import type { ChatterPreferences } from "$lib/interfaces/twitch/ChatterPreferences";
    import type { PageData } from "./$types";
    import { SignIn, SignOut } from "@auth/sveltekit/components";
    import { dev } from "$app/environment";

    const { data } = $props<{
        data: PageData;
    }>();

    const english_tts_voices = [{lang: "", gender: "Default"}, {lang: "en-AU-NatashaNeural", gender: "Female"}, {lang: "en-AU-WilliamNeural", gender: "Male"}, {lang: "en-AU-AnnetteNeural", gender: "Female"}, {lang: "en-AU-CarlyNeural", gender: "Female"}, {lang: "en-AU-DarrenNeural", gender: "Male"}, {lang: "en-AU-DuncanNeural", gender: "Male"}, {lang: "en-AU-ElsieNeural", gender: "Female"}, {lang: "en-AU-FreyaNeural", gender: "Female"}, {lang: "en-AU-JoanneNeural", gender: "Female"}, {lang: "en-AU-KenNeural", gender: "Male"}, {lang: "en-AU-KimNeural", gender: "Female"}, {lang: "en-AU-NeilNeural", gender: "Male"}, {lang: "en-AU-TimNeural", gender: "Male"}, {lang: "en-AU-TinaNeural", gender: "Female"}, {lang: "en-CA-ClaraNeural", gender: "Female"}, {lang: "en-CA-LiamNeural", gender: "Male"}, {lang: "en-GB-SoniaNeural", gender: "Female"}, {lang: "en-GB-RyanNeural", gender: "Male"}, {lang: "en-GB-LibbyNeural", gender: "Female"}, {lang: "en-GB-AbbiNeural", gender: "Female"}, {lang: "en-GB-AlfieNeural", gender: "Male"}, {lang: "en-GB-BellaNeural", gender: "Female"}, {lang: "en-GB-Backup", gender: "Female"}, {lang: "en-GB-ElliotNeural", gender: "Male"}, {lang: "en-GB-EthanNeural", gender: "Male"}, {lang: "en-GB-HollieNeural", gender: "Female"}, {lang: "en-GB-MaisieNeural", gender: "Female"}, {lang: "en-GB-NoahNeural", gender: "Male"}, {lang: "en-GB-OliverNeural", gender: "Male"}, {lang: "en-GB-OliviaNeural", gender: "Female"}, {lang: "en-GB-ThomasNeural", gender: "Male"}, {lang: "en-HK-YanNeural", gender: "Female"}, {lang: "en-HK-SamNeural", gender: "Male"}, {lang: "en-IE-EmilyNeural", gender: "Female"}, {lang: "en-IE-ConnorNeural", gender: "Male"}, {lang: "en-IN-AartiIndicNeural", gender: "Female"}, {lang: "en-IN-ArjunIndicNeural", gender: "Male"}, {lang: "en-IN-NeerjaIndicNeural", gender: "Female"}, {lang: "en-IN-PrabhatIndicNeural", gender: "Male"}, {lang: "en-IN-AaravNeural", gender: "Male"}, {lang: "en-IN-AashiNeural", gender: "Female"}, {lang: "en-IN-AartiNeural", gender: "Female"}, {lang: "en-IN-ArjunNeural", gender: "Male"}, {lang: "en-IN-AnanyaNeural", gender: "Female"}, {lang: "en-IN-KavyaNeural", gender: "Female"}, {lang: "en-IN-KunalNeural", gender: "Female"}, {lang: "en-IN-NeerjaNeural", gender: "Female"}, {lang: "en-IN-PrabhatNeural", gender: "Male"}, {lang: "en-IN-RehaanNeural", gender: "Male"}, {lang: "en-KE-AsiliaNeural", gender: "Female"}, {lang: "en-KE-ChilembaNeural", gender: "Male"}, {lang: "en-NG-EzinneNeural", gender: "Female"}, {lang: "en-NG-AbeoNeural", gender: "Male"}, {lang: "en-NZ-MollyNeural", gender: "Female"}, {lang: "en-NZ-MitchellNeural", gender: "Male"}, {lang: "en-PH-RosaNeural", gender: "Female"}, {lang: "en-PH-JamesNeural", gender: "Male"}, {lang: "en-SG-LunaNeural", gender: "Female"}, {lang: "en-SG-WayneNeural", gender: "Male"}, {lang: "en-TZ-ImaniNeural", gender: "Female"}, {lang: "en-TZ-ElimuNeural", gender: "Male"}, {lang: "en-US-AvaNeural", gender: "Female"}, {lang: "en-US-AndrewNeural", gender: "Male"}, {lang: "en-US-EmmaNeural", gender: "Female"}, {lang: "en-US-BrianNeural", gender: "Male"}, {lang: "en-US-JennyNeural", gender: "Female"}, {lang: "en-US-GuyNeural", gender: "Male"}, {lang: "en-US-AriaNeural", gender: "Female"}, {lang: "en-US-DavisNeural", gender: "Male"}, {lang: "en-US-JaneNeural", gender: "Female"}, {lang: "en-US-JasonNeural", gender: "Male"}, {lang: "en-US-KaiNeural", gender: "Male"}, {lang: "en-US-LunaNeural", gender: "Female"}, {lang: "en-US-SaraNeural", gender: "Female"}, {lang: "en-US-TonyNeural", gender: "Male"}, {lang: "en-US-NancyNeural", gender: "Female"}, {lang: "en-US-AmberNeural", gender: "Female"}, {lang: "en-US-AshleyNeural", gender: "Female"}, {lang: "en-US-BrandonNeural", gender: "Male"}, {lang: "en-US-CristopherNeural", gender: "Male"}, {lang: "en-US-CoraNeural", gender: "Female"}, {lang: "en-US-ElizabethNeural", gender: "Female"}, {lang: "en-US-EricNeural", gender: "Male"}, {lang: "en-US-JacobNeural", gender: "Male"}, {lang: "en-US-MichelleNeural", gender: "Female"}, {lang: "en-US-MonicaNeural", gender: "Female"}, {lang: "en-US-RogerNeural", gender: "Male"}, {lang: "en-US-SteffanNeural", gender: "Male"}, {lang: "en-US-BlueNeural", gender: "Neutral"}, {lang: "en-ZA-LeahNeural", gender: "Female"}, {lang: "en-ZA-LukeNeural", gender: "Male"}]

    const french_tts_voices = [{lang: "", gender: "Défaut"}, {lang: "fr-BE-CharlineNeural", gender: "Femme"}, {lang: "fr-BE-GerardNeural", gender: "Homme"}, {lang: "fr-CA-SylvieNeural", gender: "Femme"}, {lang: "fr-CA-JeanNeural", gender: "Homme"}, {lang: "fr-CA-AntoineNeural", gender: "Homme"}, {lang: "fr-CA-ThierryNeural", gender: "Homme"}, {lang: "fr-CH-ArianeNeural", gender: "Femme"}, {lang: "fr-CH-FabriceNeural", gender: "Femme"}, {lang: "fr-FR-DeniseNeural", gender: "Femme"}, {lang: "fr-FR-HenriNeural", gender: "Homme"}, {lang: "fr-FR-AlainNeural", gender: "Homme"}, {lang: "fr-FR-BrigitteNeural", gender: "Femme"}, {lang: "fr-FR-CelesteNeural", gender: "Femme"}, {lang: "fr-FR-ClaudeNeural", gender: "Homme"}, {lang: "fr-FR-CoralieNeural", gender: "Femme"}, {lang: "fr-FR-EloiseNeural", gender: "Femme"}, {lang: "fr-FR-JaquelineNeural", gender: "Femme"}, {lang: "fr-FR-JeromeNeural", gender: "Homme"}, {lang: "fr-FR-JosephineNeural", gender: "Femme"}, {lang: "fr-FR-MauriceNeural", gender: "Homme"}, {lang: "fr-FR-YvesNeural", gender: "Homme"}, {lang: "fr-FR-YvetteNeural", gender: "Femme"}]

    let preferences: ChatterPreferences = $state(data.preferences);

    const backend_url = dev ? "http://localhost:8787" : "https://thefox580-backend.zoelliotmitong.workers.dev"

    async function savePreferences(){
      await fetch(backend_url + "/api/chatter_preferences", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(preferences)
      });
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin=""/>
    {#if preferences && preferences.message_font && preferences.message_font.replaceAll(" ", "")}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family={preferences.message_font.replaceAll(" ", "+")}&display=swap">
    {/if}
    <title>Editing Chat Preferences</title>
</svelte:head>

<div class="w-full h-screen flex bg-black text-white">

    {#if !data.session || !data.session.provider === 'twitch-sub'}
        <div class="w-full flex flex-col justify-center items-center">
            <span class="text-2xl text-center text-white">You are signed out</span>
            <SignIn
                provider={data.providerMap.find(
                    (provider) => provider.id === "twitch-sub",
                ).id}
                signInPage="api/twitch/signin"
                class="mt-5.5"
            >
                <span
                    slot="submitButton"
                    class="p-2.5 border-4 border-purple-800 rounded-xl bg-purple-500 text-center text-white cursor-pointer"
                    >Sign In with Twitch</span
                >
            </SignIn>
        </div>
    {:else}
        <div class="w-full h-full flex flex-col">
            <div class="w-full h-6 flex justify-center items-center my-5">
                <span class="mr-5 text-center text-white"
                    >Signed in as {data.session.user.name} | {data.is_subbed ? `Tier ${data.is_subbed} Sub` : "Not Subscribed"}</span
                >
                <SignOut
                    signOutPage="api/twitch/signout"
                >
                    <span
                        slot="submitButton"
                        class="p-2.5 border-4 border-purple-800 rounded-xl bg-purple-500 text-center text-white cursor-pointer"
                        >Sign Out</span
                    >
                </SignOut>
            </div>


            <div class="w-auto h-full flex flex-col items-center justify-center">
                <div class="flex flew-row items-center justify-center my-2">
                    <span class="mr-2">Message color: </span>
                    <input
                        class="cursor-pointer"
                        type="color"
                        bind:value={preferences.message_color}
                        title="Change Message Color"
                        />
                </div>
                <div class="flex flew-row items-center justify-center my-2">
                    <span class="mr-2"
                        title="{data.is_subbed ? "Change Background Color" : "You must be subscribed to change your background color"}">Background color*: </span>
                    <input
                        disabled={data.is_subbed ? "" : "disabled"}
                        class="{data.is_subbed ? "cursor-pointer" : "cursor-not-allowed"}"
                        type="color"
                        bind:value={preferences.background_color}
                        title="{data.is_subbed ? "Change Background Color" : "You must be subscribed to change your background color"}"
                        />
                </div>
                <div class="flex flew-row items-center justify-center my-2">
                    <a
                        href="https://docs.google.com/document/d/18ij8A03lbyhuUOT2HQRJm3WmxGqWcNDemyyT7-3CsMY/edit?usp=sharing"
                        target="_blank"
                        class="mr-2 hover:underline"
                        title="{data.is_subbed ? "Change Message Font" : "You must be subscribed to change your message font"}"
                    >Message Font*: </a>
                    <input
                        disabled={data.is_subbed ? "" : "disabled"}
                        class="border-white text-center border-2 rounded-full px-1 w-80 {data.is_subbed ? "" : "cursor-not-allowed"}"
                        title="{data.is_subbed ? "Change Message Font" : "You must be subscribed to change your message font"}"
                        type="text"
                        bind:value={preferences.message_font}
                    />
                </div>
                <div class="flex flew-row items-center justify-center my-2">
                    <span class="mr-2">English TTS Voice: </span>
                    <select
                        bind:value={preferences.tts_voice.en}
                        name="english_tts_voice"
                        id="english_tts_voice"
                        class="text-center text-xl border-2 border-white w-80 rounded-full mx-2"
                    >
                        {#each english_tts_voices as tts_voice}
                            <option id="{tts_voice.lang}" value="{tts_voice.lang}">{tts_voice.lang !== "" ? tts_voice.lang.split("-")[1] + " | " + tts_voice.lang.split("-")[2].split("Neural")[0] : tts_voice.lang} ({tts_voice.gender})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex flew-row items-center justify-center my-2">
                    <span class="mr-2">French TTS Voice: </span>
                    <select
                        bind:value={preferences.tts_voice.fr}
                        name="english_tts_voice"
                        id="english_tts_voice"
                        class="text-center text-xl border-2 border-white w-80 rounded-full mx-2"
                    >
                        {#each french_tts_voices as tts_voice}
                            <option id="{tts_voice.lang}" value="{tts_voice.lang}">{tts_voice.lang !== "" ? tts_voice.lang.split("-")[1] + " | " + tts_voice.lang.split("-")[2].split("Neural")[0] : tts_voice.lang} ({tts_voice.gender})</option>
                        {/each}
                    </select>
                </div>
                <div class="flex flew-col items-center justify-center my-2">
                    <button
                        class="py-2 px-2 rounded-full cursor-pointer bg-green-500"
                        onclick={() => {
                        savePreferences();
                        }}>Save Preferences</button>
                </div>

                {#key preferences}

                    <div style="background-color: {preferences.background_color};" class="w-auto flex flex-col mt-5 mx-2 p-2.5 border-red-500 border-4 rounded-2xl">
                        <div class="w-full flex flex-row items-center justify-center">
                            <div class="w-[{(28+2)*2}px] flex flex-row items-center justify-center mr-2">
                                <img src="https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/2" alt="Broadcaster badge" class="h-[28px] mr-1"/>
                                {#if data.is_subbed}
                                    <img src="https://static-cdn.jtvnw.net/badges/v1/9a2c846d-c5b9-41e8-b60c-7bcfc1cd0599/2" alt="1 month subscriber badge" class="h-[28px] mr-1"/>
                                {/if}
                            </div>
                            <p class="text-white text-xl border-4 rounded-xl px-2 py-1 mr-2 text-center items-center justify-center">They / Them</p>
                            <p class="text-red-500 font-bold text-xl">{data.session.user.name}</p>
                        </div>
                        <div class="flex items-center justify-center text-center mt-2.5">
                            <span style="color:{preferences.message_color}; {preferences.message_font !== "" ? `font-family: "${preferences.message_font}"` : ""}" class="text-center text-wrap wrap-anywhere mr-1 text-xl">This is an example message on the overlay <img class="inline-grid mr-2 h-[36px] align-middle" src="https://cdn.7tv.app/emote/01GYX4MQV80005HW5M02HH0TMX/3x.avif" alt="WAHOO Emote"></span>
                        </div>
                    </div>
                {/key}
            </div>
        </div>
    {/if}

</div>
