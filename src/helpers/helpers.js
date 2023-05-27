

export function getNormalizePhotos(array) {
    return array.map(({ id, avg_color, alt, src: { large } })=>({ id, avg_color, alt, large }))
}