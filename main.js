/** Alvin Naufal */
const MainLayout = (cb) => {
    const elBody = document.body;
    elBody.style.margin = 0
    elBody.style.padding = 0
    elBody.style.fontFamily = "sans-serif";
    const main = document.createElement("main");
    const style = {
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        paddingBottom: "6rem",
    };
    Object.assign(main.style, style)
    elBody.insertBefore(main, elBody.childNodes[0]);

    cb(main)
};

const ContentLayout = (el, cb) => {
    const content = document.createElement("div");
    const style = {
        position: "relative",
    };
    Object.assign(content.style, style);

    el.appendChild(content);
    cb(content);
};

const HeaderBackground = (el, cb) => {
    const header = document.createElement("div");
    const style = {
        position: "absolute",
        top: "0",
        backgroundColor: "#ff33ae",
        width: "100%",
        height: "125px",
    };
    Object.assign(header.style, style);

    el.appendChild(header);
    cb(header)
};

/**
 * 
 * @param {{title: string, style: any}} props 
 * @returns 
 */
const ButtonComponent = (props) => {
    const button = document.createElement("button");
    const style = {
        backgroundColor: "#ff33ae",
        border: "none",
        borderRadius: "0.25rem",
        color: "white",
        padding: "0.5rem",
        fontWeight: "bold",
        ...props.style
    };
    Object.assign(button.style, style);
    button.innerText = props.title;

    return button;
};
/**
 * 
 * @param {{title: string, style: any}} props 
 * @returns 
 */
const ImageButtonComponent = (props) => {
    const image = document.createElement("img");
    const style = {
        // backgroundColor: "#ff33ae",
        // border: "none",
        // borderRadius: "0.25rem",
        // color: "white",
        // padding: "0.5rem",
        // fontWeight: "bold",
        ...props.style
    };
    Object.assign(image.style, style);
    image.src = props.src

    return image;
};

/**
 * 
 * @param {{placeholder: string, style: any}} props 
 * @returns 
 */
const InputComponent = (props) => {
    const input = document.createElement("input");
    const style = {
        border: "none",
        borderBottom: "1px solid #bcbcbc",
        padding: "1rem",
        ...props.style
    };
    Object.assign(input.style, style);
    input.placeholder = props.placeholder;

    return input;
};

const InputTodo = (el) => {
    const container = document.createElement("div");
    const containerFlex = document.createElement("div");
    const elParagraph = document.createElement("p");

    const style = {
        position: "relative",
        top: "4rem",
        borderRadius: "0.375rem",
        backgroundColor: "white",
        height: "5rem",
        padding: "0.1rem 1rem 2.0rem",
        maxWidth: "768px",
        margin: "0 auto",
        boxShadow: "0 20px 25px -25px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
    };
    Object.assign(container.style, style);
    el.append(container);

    /** P */
    elParagraph.textContent = "New Todo:"
    elParagraph.style.fontWeight = "bold"
    container.appendChild(elParagraph);
    /** P - END */

    /** CONTAINER FLEX */
    containerFlex.style.display = "flex"
    containerFlex.style.justifyContent = "space-between"
    containerFlex.style.height = "2.5rem"
    container.appendChild(containerFlex);
    /** CONTAINER FLEX - END */
    
    /** FLEX CHILD */
    const inputComponent = InputComponent({
        placeholder: "Add a Task...",
        style: {
            flexGrow: "1",
            marginRight: "2rem",
        },
    });
    const buttonComponent = ButtonComponent({
        title: "Add",
        style: { flexShrink: "0", marginLeft: "0.5rem", width: "4.7rem" },
    });
    containerFlex.appendChild(inputComponent);
    containerFlex.appendChild(buttonComponent);
    /** FLEX CHILD - END */

    /** EVENT LISTENER */
    buttonComponent.addEventListener("click", (e) => {
        e.preventDefault();
        ListComponent({ title: inputComponent.value ? inputComponent.value : "No Title" });
        inputComponent.value = ""
    });
    inputComponent.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            ListComponent({ title: inputComponent.value ? inputComponent.value : "No Title" });
            inputComponent.value = "";
            return false;
        }
    })
    /** EVENT LISTENER  END */

    return container;
};

const ListContainer = (el) => {
    const container = document.createElement("div");

    const style = {
        position: "relative",
        top: "5rem",
        maxWidth: "798px",
        margin: "0 auto",
    };
    Object.assign(container.style, style);
    container.setAttribute("id", "list-container")
    el.appendChild(container);
};

/**
 * 
 * @param {{title: string}} props 
 * @returns 
 */
const ListComponent = (props) => {
    const listContainer = document.getElementById("list-container");
    const list = document.createElement("div");
    const wrapAction = document.createElement("div");
    wrapAction.style.alignSelf = "center"
    const title = document.createElement("p");
    title.textContent = props.title;

    const style = {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: "1rem 1rem 1rem 3rem",
        margin: "0.5rem 0",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
    };
    Object.assign(list.style, style);
    
    const editButton = ImageButtonComponent({
        src: "./images/edit.svg",
        style: {
            display: "inline-block",
            width: "27px",
            height: "27px",
            marginRight: "1rem",
        },
    });
    const deleteButton = ImageButtonComponent({
        src: "./images/trash.svg",
        style: {
            display: "inline-block",
            width: "27px",
            height: "27px"
        },
    });
    const onEditButton = ImageButtonComponent({
        src: "./images/check.svg",
        style: {
            display: "inline-block",
            width: "28px",
            height: "28px",
            marginRight: "1rem",
        },
    });
    const onEditInput = (val, saveButton) => {
        const edit = InputComponent({
            placeholder: "Edit task...",
            style: {
                flexGrow: "1",
                marginRight: "2rem",
                // padding: 0
            },
        });
        edit.value = val;

        /** EVENT LISTENER */
        edit.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const newTitle = title;
                newTitle.innerText =
                    edit.value !== "" ? edit.value : "No Title";

                saveButton.replaceWith(editButton);
                edit.replaceWith(newTitle);
                return false;
            }
        });
        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            const newTitle = title;
            newTitle.innerText = edit.value !== "" ? edit.value : "No Title";

            saveButton.replaceWith(editButton);
            edit.replaceWith(newTitle);
        });
        /** EVENT LISTENER  END */

        return edit;
    }
    
    list.appendChild(title);
    wrapAction.appendChild(editButton);
    wrapAction.appendChild(deleteButton);
    list.appendChild(wrapAction);

    listContainer.insertBefore(list, listContainer.firstChild);

    const saveButton = onEditButton
    editButton.addEventListener("click", (e) => {
        e.preventDefault();
        editButton.replaceWith(saveButton);
        title.replaceWith(onEditInput(title.innerText, saveButton));
    });
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        list.remove()
    });

    return list;
};

addEventListener("load", () => {
    MainLayout((el)=> {
        ContentLayout(el, (elContent)=> {
            HeaderBackground(elContent, (elHeader)=> {
                InputTodo(elContent)
            })
            ListContainer(elContent)
        })
    })
});
