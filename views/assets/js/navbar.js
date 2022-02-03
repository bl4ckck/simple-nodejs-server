/** Alvin Naufal */
let elRoot, elHeader, elToggle;
let init_bg_name = "bg-transparent";

addEventListener("load", () => {
    elRoot = document.documentElement;
    elHeader = document.querySelector("#header");
    elToggle = document.querySelector(".navbar-toggler[type=button]");

    const changeBgColor = (clsName) => {
        elHeader.classList.replace(init_bg_name, clsName);
        init_bg_name = clsName;
    };
    const onNavScroll = (isTop) => {
        changeBgColor(isTop ? "bg-transparent" : "bg-light");
        /** With classlist add & remove */
        elHeader.classList.remove(isTop ? "navbar-light" : "navbar-dark");
        elHeader.classList.add(isTop ? "navbar-dark" : "navbar-light");
    };

    /**
     * Event Listener 
     */
    /** Curr Y Pos */
    window.scrollY > 100 ? onNavScroll() : null
    /** On Scroll Body */
    addEventListener("scroll", () => elRoot.scrollTop > 100 ? onNavScroll() : onNavScroll(true));
});
