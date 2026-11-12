// Small server-side proxy so MusicBrainz receives an identifiable User-Agent.
// No Spotify tokens or user credentials pass through this function.
export default async (request) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get('mode');
  const headers = { 'User-Agent': 'LIBRARY/0.2 (Spotify personal-library viewer)', 'Accept': 'application/json' };
  let target;
  if (mode === 'search') {
    const title = (url.searchParams.get('title') || '').slice(0,180);
    const artist = (url.searchParams.get('artist') || '').slice(0,180);
    if (!title || !artist) return new Response(JSON.stringify({error:'Missing title or artist'}), {status:400,headers:{'Content-Type':'application/json'}});
    const query = `releasegroup:"${title.replace(/["\\]/g,' ')}" AND artist:"${artist.replace(/["\\]/g,' ')}"`;
    target = 'https://musicbrainz.org/ws/2/release-group/?' + new URLSearchParams({query,fmt:'json',limit:'8'});
  } else if (mode === 'detail') {
    const id = url.searchParams.get('id') || '';
    if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response(JSON.stringify({error:'Invalid MusicBrainz ID'}), {status:400,headers:{'Content-Type':'application/json'}});
    target = `https://musicbrainz.org/ws/2/release-group/${id}?` + new URLSearchParams({inc:'genres+tags',fmt:'json'});
  } else return new Response(JSON.stringify({error:'Invalid mode'}), {status:400,headers:{'Content-Type':'application/json'}});
  try {
    const upstream = await fetch(target, {headers});
    const body = await upstream.text();
    return new Response(body, {status:upstream.status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=86400','Access-Control-Allow-Origin':'*'}});
  } catch {
    return new Response(JSON.stringify({error:'MusicBrainz request failed'}), {status:502,headers:{'Content-Type':'application/json'}});
  }
};
