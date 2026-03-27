const inputs = ["username", "email", "country", "age"];

inputs.forEach(id => {
    document.getElementById(id).addEventListener("input", () => {
        document.getElementById("welcomeBox").style.display = "block";
    });
});  
