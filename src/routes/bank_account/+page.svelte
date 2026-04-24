<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <meta charset="UTF-8" />
    <title>Bank account</title>
</svelte:head>
>

<body>
    <div class="flex flex-col justity-center items-center">
        <h1>Your bank account :</h1>
        <p>Money:</p>
        <span id="money">You're poor lmao</span>
    </div>
</body>

<style>
    html {
        background-color: #000000;
        color: #ffffff;
        font-family: Arial, sans-serif;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    #money {
        color: #00ff00;
        font-size: 200%;
    }
    h1 {
        font-size: 500%;
    }
    p {
        font-size: 300%;
    }
</style>
