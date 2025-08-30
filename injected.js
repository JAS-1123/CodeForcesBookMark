function getContestId() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return (parts.indexOf('problem') !== -1) ? parts[parts.indexOf('problem') + 1] : null;
}

function getQuestionNum() {
    const path = window.location.pathname;
    const parts = path.split('/');
    return (parts.indexOf('problem') !== -1) ? parts[parts.indexOf('problem') + 2] : null; 
}

function addBookmark(){
    const menu = document.querySelector('.second-level-menu-list');
    if(!menu){
        console.log("second-level-menu-list not found");
        return;
    }

    if(document.getElementById("bookmark-btn")) return;

    const btnDiv = document.createElement("div");
    btnDiv.style.display = "flex";
    btnDiv.style.flexDirection = "row";
    btnDiv.style.marginLeft = "10px";

    const btn = document.createElement("button");
    btn.innerText = "ADD TO BOOKMARK";
    btn.id = "bookmark-btn";
    btn.style.fontSize = "11px";
    btn.style.fontWeight = "bold";
    btn.style.padding = "4px 8px";
    btn.style.border = "1px solid #ccc";
    btn.style.borderRadius = "6px";
    btn.style.backgroundColor = "#f0f0f0";
    btn.style.cursor = "pointer";
    btn.style.marginLeft = "5px";

    const btn2 = document.createElement("input");    
    btn2.style.borderRadius = "6px";

    btn.addEventListener("click", () => {
        const qid = getContestId();
        const qid2 = getQuestionNum();
        if(!qid || !qid2){
            alert("could not get problem ID");
            return;
        }
        const name = btn2.value;

        const qlink = `https://codeforces.com/problemset/problem/${qid}/${qid2}`;
        chrome.storage.local.get({ bookmarks: {} }, (result) => {
    
            // console.log(result);
            const bookmarks = result.bookmarks;
            if(!bookmarks[name]){
                bookmarks[name] = [];
            }

            if(!bookmarks[name].includes(qlink)) {
                bookmarks[name].push(qlink);
                // console.log(bookmarks);
                chrome.storage.local.set({ bookmarks }, () => {
                    alert("Bookmark added!");
                });
            }
            else{
                alert("Already bookmarked!");
            }
        });
    });
    btnDiv.appendChild(btn2);
    btnDiv.appendChild(btn);
    menu.appendChild(btnDiv);
}

function AddBookmarkSection(bookmarks) {
    const pageContent = document.getElementById("pageContent");
    if (!pageContent) {
        console.log("pageContent not ready yet");
        return;
    }

    if (document.getElementById("my-bookmark-section")) return;

    console.log("connected to the profile");
    const bookmarkDiv = document.createElement("div");
    bookmarkDiv.id = "my-bookmark-section";
    bookmarkDiv.style.border = "1px solid #ccc";
    bookmarkDiv.style.padding = "10px";
    bookmarkDiv.style.marginTop = "20px";
    bookmarkDiv.style.borderRadius = "5px";
    bookmarkDiv.style.backgroundColor = "#fff";

    const heading = document.createElement("h3");
    heading.innerText = "My Bookmarks";
    bookmarkDiv.appendChild(heading);

    const listDiv = document.createElement("div");
    listDiv.id = "bookmark-list";

    if (bookmarks.length === 0) {
        listDiv.innerText = "No bookmarks yet.";
    } 
    else{
        for(let key in bookmarks){
                const heading2 = document.createElement("h4");
                heading2.innerText = key;
                listDiv.appendChild(heading2);

            bookmarks[key].forEach(url => {
                const item = document.createElement("div");
                item.style.display = "flex";
                item.style.alignItems = "center";
                item.style.gap = "10px";
                item.style.marginBottom = "5px";

                const link = document.createElement("a");
                link.href = url;
                link.innerText = `${url.split('/').slice(-2).join('/')}`;
                link.target = "_blank";

                const deletebtn = document.createElement("button");
                deletebtn.innerText = "Delete";
                deletebtn.style.padding = "4px 8px";
                deletebtn.style.border = "1px solid #ccc";
                deletebtn.style.borderRadius = "4px";
                deletebtn.style.backgroundColor = "#f0f0f0";
                deletebtn.style.cursor = "pointer";

                deletebtn.addEventListener("click", () => {
                    chrome.storage.local.get({ bookmarks: {} }, ({ bookmarks }) => {
                        const updated = bookmarks;
                        if(Array.isArray(updated[key])){
                            updated[key] = updated[key].filter(link => link !== url);
                            if (updated[key].length === 0){
                                delete updated[key];
                                if(heading2 && heading2.parentNode){
                                    heading2.remove();
                                }
                            }
                            chrome.storage.local.set({ bookmarks: updated }, () => {
                                item.remove();
                            });
                        }
                    });
                });
                item.appendChild(deletebtn);
                item.appendChild(link);
                listDiv.appendChild(item);
            });
        }
    }

    bookmarkDiv.appendChild(listDiv);
    pageContent.appendChild(bookmarkDiv);
}


if (window.location.pathname.split('/').indexOf('profile') !== -1) {
    const waitForPageContent = setInterval(() => {
        const pageContent = document.getElementById("pageContent");
        if(pageContent){
            clearInterval(waitForPageContent);
            chrome.storage.local.get({ bookmarks: {} }, (data) => {
                AddBookmarkSection(data.bookmarks);
            });
        }
    }, 500);
}

if (window.location.pathname.split('/').indexOf('problemset') !== -1) {
    addBookmark();
}
