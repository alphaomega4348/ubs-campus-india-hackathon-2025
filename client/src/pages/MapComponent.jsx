/* global google */

import React, { useRef, useState } from 'react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api'

const center = { lat:18.552848668067604, lng: 73.9539305606305  }

const MapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyCliTDgdPUC04xTYS6RDXsbbKIYR5Ir5W0",
        libraries: ['places'],
    })

    const [map, setMap] = useState(null)
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    const originRef = useRef(null)
    const destinationRef = useRef(null)
    const originAutocomplete = useRef(null)
    const destinationAutocomplete = useRef(null)

    if (!isLoaded) {
        return <div>Loading...</div>
    }

    function handlePlaceSelect(ref) {
        if (ref.current) {
            const place = ref.current.getPlace()
            if (place && place.formatted_address) {
                ref.current.input.value = place.formatted_address
            }
        }
    }

    async function calculateRoute() {
        if (!originRef.current.value || !destinationRef.current.value) {
            return
        }
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    function clearRoute() {
        setDirectionsResponse(null)
        setDistance('')
        setDuration('')
        originRef.current.value = ''
        destinationRef.current.value = ''
    }

    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%' }}>
                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                        zoomControl: false,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                >
                    <Marker position={center} />
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                </GoogleMap>
            </div>

            <div style={{ padding: '16px', borderRadius: '8px', margin: '16px', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', minWidth: '400px', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ flexGrow: 1, marginRight: '8px' }}>
                        <Autocomplete onLoad={ref => (originAutocomplete.current = ref)} onPlaceChanged={() => handlePlaceSelect(originAutocomplete)}>
                            <input type="text" placeholder="Origin" ref={originRef} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </Autocomplete>
                    </div>
                    <div style={{ flexGrow: 1, marginRight: '8px' }}>
                        <Autocomplete onLoad={ref => (destinationAutocomplete.current = ref)} onPlaceChanged={() => handlePlaceSelect(destinationAutocomplete)}>
                            <input type="text" placeholder="Destination" ref={destinationRef} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                        </Autocomplete>
                    </div>
                    <div>
                        <button onClick={calculateRoute} style={{ padding: '8px 12px', backgroundColor: '#ff69b4', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            Calculate Route
                        </button>
                        <button onClick={clearRoute} style={{ marginLeft: '8px', padding: '8px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <p>Distance: {distance}</p>
                    <p>Duration: {duration}</p>
                    <button onClick={() => { map.panTo(center); map.setZoom(15) }} style={{ padding: '8px', borderRadius: '50%', border: 'none', backgroundColor: 'blue', color: 'white', cursor: 'pointer' }}>
                        <FaLocationArrow />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MapComponent