
const clarityText = document.getElementById("clarityText");
const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");
const entriesDiv = document.getElementById("entries");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const openAppLink = document.getElementById("openAppLink");

// ✅ Replace this with your actual Vercel URL
const APP_URL = "https://YOUR-VERCEL-LINK.vercel.app/";
openAppLink.href = APP_URL;

function formatTime(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function loadEntries() {
  chrome.storage.local.get(["clarityEntries"], (res) => {
    const entries = res.clarityEntries || [];
    renderEntries(entries);
  });
}

function renderEntries(entries) {
  entriesDiv.innerHTML = "";

  if (entries.length === 0) {
    entriesDiv.innerHTML = `<div class="entry"><div class="entryText">No entries yet.</div></div>`;
    return;
  }

  entries.forEach((item) => {
    const box = document.createElement("div");
    box.className = "entry";

    box.innerHTML = `
      <div class="entryTop">
        <span class="time">${formatTime(item.ts)}</span>
        <button class="delOne" data-id="${item.id}">Delete</button>
      </div>
      <div class="entryText"></div>
    `;

    box.querySelector(".entryText").textContent = item.text;

    box.querySelector(".delOne").addEventListener("click", () => {
      deleteOne(item.id);
    });

    entriesDiv.appendChild(box);
  });
}

function saveEntry(text) {
  chrome.storage.local.get(["clarityEntries"], (res) => {
    const prev = res.clarityEntries || [];
    const entry = { id: crypto.randomUUID(), ts: Date.now(), text };

    const next = [entry, ...prev].slice(0, 30);
    chrome.storage.local.set({ clarityEntries: next }, () => {
      clarityText.value = "";
      loadEntries();
    });
  });
}

function deleteOne(id) {
  chrome.storage.local.get(["clarityEntries"], (res) => {
    const prev = res.clarityEntries || [];
    const next = prev.filter((x) => x.id !== id);
    chrome.storage.local.set({ clarityEntries: next }, loadEntries);
  });
}

function deleteAll() {
  chrome.storage.local.set({ clarityEntries: [] }, loadEntries);
}

saveBtn.addEventListener("click", () => {
  const text = clarityText.value.trim();
  if (!text) return;
  saveEntry(text);
});

clearBtn.addEventListener("click", () => {
  clarityText.value = "";
});

deleteAllBtn.addEventListener("click", () => {
  deleteAll();
});

loadEntries();
