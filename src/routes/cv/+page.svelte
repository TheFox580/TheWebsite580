<script lang="ts">
    const birth = new Date(2006, 2, 4, 18, 0, 0);
    const diff = new Date(new Date().getTime()-birth.getTime());

    const age = diff.getFullYear()-1970;

    let divH = $state();
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/cv/cv.css" />
    <title>Elliot Defrance | CV</title>
</svelte:head>

<a class="fixed bottom-0 left-0 m-3 rounded-full bg-white p-2 cursor-pointer" aria-label="Télécharger le CV" href="/other/cv/CV_Elliot_Defrance_FR.pdf" download target="_blank" title="Télécharger le CV">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="black" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download preview-icon"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
</a>

<div class="w-screen h-full flex flex-row items-stretch justify-center">
    <div class="w-full h-full mx-10 my-5 flex items-stretch text-center">
        <div class="flex flex-col h-full w-2/5 bg-green-500 rounded-l-2xl items-center justify-center px-2" bind:clientHeight={divH}>
            <br class="mt-5"/>
            <h1 class="text-4xl">Elliot Defrance ({age} ans)</h1>
            <br class="mt-10"/>
            <h2 class="text-3xl">Etudiant en 3ème année de Licence Informatique</h2>
            <br class="mt-5"/>
            <h3 class="text-2xl text-justify px-2">Actuellement en recherche d'un stage de 2 mois (14 mars au 22 mai 2026) en Informatique pour compléter mes études et obtenir ma licence en plus d'obtenir une expérience professionnelle pour me préparer au monde du travail dans ce domaine.</h3>
            <br class="mt-15"/>
            <div class="w-full flex flex-col items-start justify-start px-2">
                <div class="flex flex-row text-wrap wrap-break-word mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-at-sign preview-icon"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>
                    <a class="ml-2" href="mailto:stage@thefox580.me" target="_blank">stage@thefox580.me</a>
                </div>
                <div class="flex flex-row text-wrap wrap-break-word mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone preview-icon"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
                    <a class="ml-2" href="tel:33766029909" target="_blank">+33 7 66 02 99 09</a>
                </div>
                <div class="flex flex-row text-wrap wrap-break-word mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe preview-icon"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    <a class="ml-2" href="/" target="_blank">thefox580.me</a>
                </div>
                <div class="flex flex-row text-wrap wrap-break-word mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car preview-icon"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                    <span class="ml-2">Permis B</span>
                </div>
            </div>
            <br class="mt-5"/>
            <div class="flex flex-col w-full items-start">
                <h2 class="text-2xl">Langues</h2>
                <br class="mt-2.5"/>
                <div class="ml-5 flex flex-col items-start">
                    <span>- Français (Langue maternelle)</span>
                    <span>- Anglais (C1)</span>
                </div>
            </div>
            <br class="mt-5"/>
            <div class="flex flex-col w-full items-start">
                <h2 class="text-2xl">Compétances</h2>
                <br class="mt-2.5"/>
                <div class="ml-5 flex flex-col items-start">
                    <span>- Java</span>
                    <span>- HTML, CSS / Tailwind</span>
                    <span>- JavaScript / TypeScript</span>
                    <span>- Svelte</span>
                    <span>- Python</span>
                    <span>- Skript</span>
                </div>
            </div>
            <br class="mt-5"/>
            <div class="flex flex-col w-full items-start">
                <h2 class="text-2xl">Passions</h2>
                <br class="mt-2.5"/>
                <div class="ml-5 flex flex-col items-start">
                    <span>- Jeux-vidéos</span>
                    <span>- Création de contenu</span>
                </div>
            </div>
            <br class="mt-5"/>
            <div class="flex flex-col w-full items-start">
                <h2 class="text-2xl">Réseaux</h2>
                <br class="mt-2.5"/>
                <div class="ml-5">
                    <a href="https://www.github.com/TheFox580" target="_blank" class="flex flex-row items-center my-2"><img src="/img/cv/GitHub_Invertocat_White.png" class="w-10 mr-2" alt="Logo Github Blanc"/> <span>Github</span></a>
                    <a href="https://www.linkedin.com/in/elliot-defrance-40a3a7446" target="_blank" class="flex flex-row items-center my-2"><img src="/img/cv/InBug-White.png" class="w-10 mr-2" alt="Logo Github Blanc"/> <span>LinkedIn</span></a>
                </div>
            </div>
            <br class="mt-5"/>
        </div>
        <div class="flex flex-col w-full bg-neutral-600 rounded-r-2xl items-center justify-start" style="height: {divH};">
            <br class="mt-5"/>
            <h1 class="text-5xl">Mes études</h1>
            <br class="mt-15"/>
            <h2 class="text-3xl">Lycée Voltaire - Wingles (2019-2022)</h2>
            <p class="text-xl">Bac Général - Mention Assez Bien | Option Sciences de la Vie et de la Terre, Numérique et Sciences de l'Informatique</p>
            <br class="mt-5"/>
            <h2 class="text-3xl">Factulé des Sciences Jean Perrin - Lens (2023-2024)</h2>
            <p class="text-xl">Parcours Préparatoire au Professorat des Ecoles </p>
            <br class="mt-5"/>
            <h2 class="text-3xl">Factulé des Sciences Jean Perrin - Lens (2024-2027)</h2>
            <p class="text-xl">Licence Informatique</p>
            <br class="mt-20"/>
            <h1 class="text-5xl">Mes expériences personelles et professionelles</h1>
            <br class="mt-15"/>
            <h2 class="text-3xl">Développeur Java (1 an)</h2>
            <p class="text-xl">Développeur pour <a href="https://twitter.com/ItsMCMayhem" target="_blank">MC Mayhem</a>, un évènement Minecraft réunissant 40 joueurs dans 8 épreuves différentes.</p>
            <br class="mt-5"/>
            <h2 class="text-3xl">Lead Développeur Skript (2 ans)</h2>
            <p class="text-xl">Lead Développeur pour <a href="https://twitter.com/FruitWarsEvent" target="_blank">Fruit Wars</a>.</p>
            <br class="mt-5"/>
            <h2 class="text-3xl">Employé de mairie (1 mois)</h2>
            <p class="text-xl">J'ai pu apprendre le monde du travail à travers un job étudiant.</p>
        </div>
    </div>
</div>
