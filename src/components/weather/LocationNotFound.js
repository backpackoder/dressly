function LocationNotFound() {
  return (
    <>
      <div id="locationNotFound">
        <img src="temp0.png" alt="Ninguna ciudad ha sido encontrada" />
        <p>
          Ninguna ciudad ha sido encontrada. <br />
          <br />
          Para arreglar el problema:
          <br />
          1. Verifica tu conexion internet.
          <br />
          2. Autorizanos compartir tu ubicacion.
          <br />
          3. Cambia la ciudad o el pais que has elegido.
        </p>
      </div>
    </>
  );
}

export default LocationNotFound;
