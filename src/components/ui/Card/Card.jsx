import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Card({ nombre, descripcion, buttonText, imageUrl, url }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div class="card-header d-flex justify-content-center">{nombre}</div>
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={nombre} />}
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-center">{nombre}</h5>
        <p className="card-text d-flex justify-content-center">{descripcion}</p>
      </div>
      <div className="card-footer">
        <a href={url} className="btn btn-primary d-flex justify-content-center">
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default Card;
