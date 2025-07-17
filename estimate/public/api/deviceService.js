/* サーバと通信をして値を取得するための窓口 */

const API_BASE = 'http://localhost:3000/api';

export async function fetchDevices(){
    const res = await fetch(`${API_BASE}/devices`);
    if(!res.ok) throw new Error('Failed to fetch devices');
    return await res.json();
}