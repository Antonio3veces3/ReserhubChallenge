import { useSearchParams } from 'react-router-dom'

export function City() {
    const [searchParams] = useSearchParams()
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    return (
        <div>
            <h1>City</h1>
            <p>Latitude: {lat || 'N/A'}</p>
            <p>Longitude: {lon || 'N/A'}</p>
        </div>
    )
}
