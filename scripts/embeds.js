export function SpotifyEmbed(url) {
  return `<div class="embed-container"><iframe data-testid="embed-iframe" style="border-radius:12px" src="${url}" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>`;
}

export function SoundCloudEmbed(url) {
  return `<div class="embed-container"><iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="${url}"></iframe></div>`;
}
