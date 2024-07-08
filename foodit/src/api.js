export async function getFoods() {
    const response = await fetch('https://learn.codeit.kr/1234/foods');
    const data = await response.json();
    return data;
}