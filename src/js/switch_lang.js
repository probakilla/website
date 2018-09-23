function switchFr ()
{
    // Jumbotron
    document.getElementById("jbNameEn").classList.add("hidden");
    document.getElementById("jbNameFr").classList.remove("hidden");

    // BIOGRAPHY
    document.getElementById("bioEn").classList.add("hidden");
    document.getElementById("bioFr").classList.remove("hidden");

    // SKILLS
    document.getElementById("skillEn").classList.add("hidden");
    document.getElementById("skillFr").classList.remove("hidden");

    // HOBBIES
    document.getElementById("hobbiesEn").classList.add("hidden");
    document.getElementById("hobbiesFr").classList.remove("hidden");
}

function switchEn ()
{
    // Jumbotron
    document.getElementById("jbNameFr").classList.add("hidden");
    document.getElementById("jbNameEn").classList.remove("hidden");

    // Body bio
    document.getElementById("bioFr").classList.add("hidden");
    document.getElementById("bioEn").classList.remove("hidden");

    // SKILLS
    document.getElementById("skillFr").classList.add("hidden");
    document.getElementById("skillEn").classList.remove("hidden");

    // HOBBIES
    document.getElementById("hobbiesFr").classList.add("hidden");
    document.getElementById("hobbiesEn").classList.remove("hidden");
}


// Btn for language
document.getElementById("enBtn").addEventListener("click", switchEn, false);
document.getElementById("frBtn").addEventListener("click", switchFr, false);