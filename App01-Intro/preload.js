function setVersion(idSelector, version){
    let element = document.getElementById(idSelector);

    if(element){
        element.innerText = version;
    }
    else{
        element.innerText = "hola"
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const components = ['Node', 'Chrome', 'Electron'];
    for(const component of components){
        // AltGr + } dos veces para poner las comillas
        setVersion(`version${component}`, process.versions[component.toLowerCase()]);
    }
});