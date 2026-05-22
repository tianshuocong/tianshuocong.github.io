function showBibtex(key) {
  const template = document.querySelector(`template[data-bibtex-key="${key}"]`);
  const content = template ? template.content.textContent.trim() : "BibTeX not available yet.";
  document.getElementById("bibtexContent").textContent = content;
  const modal = new bootstrap.Modal(document.getElementById("bibtexModal"));
  modal.show();
}

function copyBibtex() {
  const text = document.getElementById("bibtexContent").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("BibTeX copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy BibTeX.");
  });
}


async function loadSectionContent() {
  const panes = document.querySelectorAll("[data-include]");

  await Promise.all(Array.from(panes).map(async (pane) => {
    const source = pane.getAttribute("data-include");

    try {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      pane.innerHTML = await response.text();
    } catch (error) {
      pane.innerHTML = `<p class="text-danger">Unable to load ${source}. Please view this site through a web server.</p>`;
      console.error(`Failed to load ${source}:`, error);
    }
  }));

  if (window.busuanzi && typeof window.busuanzi.fetch === "function") {
    window.busuanzi.fetch();
  }
}

document.addEventListener("DOMContentLoaded", loadSectionContent);
