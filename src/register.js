import { useEffect, useRef, useState } from "react";

const REGIONES = {
  "Arica y Parinacota": ["Arica", "Camarones", "General Lagos", "Putre"],
  "Tarapacá": ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"],
  "Antofagasta": ["Antofagasta", "Calama", "María Elena", "Mejillones", "Sierra Gorda", "Taltal", "Tocopilla"],
  "Atacama": ["Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"],
  "Coquimbo": ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Vicuña"],
  "Valparaíso": ["Algarrobo", "Cabildo", "Calera", "Calera de Tango", "Calle Larga", "Cartagena", "Casablanca", "Concón", "El Quisco", "El Tabo", "Hijuelas", "La Cruz", "La Ligua", "Limache", "Llay-Llay", "Los Andes", "Nogales", "Petorca", "Puchuncaví", "Quillota", "Quilpué", "Quintero", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"],
  "Metropolitana": ["Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Santiago","Vitacura"],
  "O'Higgins": ["Chimbarongo","Codegua","Coinco","Coltauco","Doñihue","Graneros","Las Cabras","Machalí","Malloa","Mostazal","Olivar","Peumo","Pichidegua","Quinta de Tilcoco","Rancagua","Rengo","Requínoa","San Fernando","San Vicente"],
  "Maule": ["Cauquenes","Chanco","Curicó","Hualañé","Linares","Longaví","Maule","Molina","Parral","Pelarco","Pelluhue","Romeral","Río Claro","San Clemente","San Javier","Talca","Teno","Villa Alegre","Yerbas Buenas"],
  "Ñuble": ["Bulnes","Chillán","Chillán Viejo","Coelemu","Coihueco","El Carmen","Ninhue","Ñiquén","Pemuco","Pinto","Quillón","Quirihue","Ránquil","San Carlos","San Fabián","San Ignacio","San Nicolás","Treguaco","Yungay"],
  "Biobío": ["Cabrero","Arauco","Cañete","Concepción","Chiguayante","Coronel","Hualpén","Hualqui","Laja","Lebu","Los Álamos","Los Ángeles","Lota","Mulchén","Nacimiento","Penco","San Pedro de la Paz","Santa Bárbara","Talcahuano","Tirúa","Tomé","Tucapel","Yumbel"],
  "La Araucanía": ["Angol","Carahue","Collipulli","Cunco","Curacautín","Freire","Gorbea","Lautaro","Loncoche","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Purén","Renaico","Saavedra","Temuco","Teodoro Schmidt","Toltén","Traiguén","Victoria","Vilcún","Villarrica"],
  "Los Ríos": ["Futrono","La Unión","Lago Ranco","Lanco","Los Lagos","Máfil","Mariquina","Paillaco","Panguipulli","Río Bueno","Valdivia"],
  "Los Lagos": ["Ancud","Calbuco","Castro","Chaitén","Cochamó","Curaco de Vélez","Dalcahue","Fresia","Frutillar","Futaleufú","Hualaihué","Llanquihue","Los Muermos","Maullín","Osorno","Palena","Puerto Montt","Puerto Octay","Puerto Varas","Puqueldón","Queilén","Quellón","Quemchi","Quinchao","Río Negro","San Juan de la Costa","San Pablo"],
  "Aysén": ["Aysén","Chile Chico","Cisnes","Cochrane","Coyhaique","Guaitecas","Lago Verde","O'Higgins","Río Ibáñez","Tortel"],
  "Magallanes": ["Cabo de Hornos","Laguna Blanca","Natales","Porvenir","Primavera","Punta Arenas","Río Verde","San Gregorio","Timaukel","Torres del Paine"]
};

export default function Register() {
  const formRef = useRef(null);
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  useEffect(() => {
    document.title = "Weigamer • Registro";
  }, []);

  useEffect(() => {
    setComuna("");
  }, [region]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!region || !comuna) {
      alert("Selecciona región y comuna.");
      return;
    }

    const data = Object.fromEntries(new FormData(formRef.current).entries());
    console.log("Registro enviado:", data);
    alert("Cuenta creada correctamente (demo).");
  };

  const regiones = Object.keys(REGIONES);
  const comunas = region ? REGIONES[region] : [];

  return (
    <div className="container">
      <h1>Registro</h1>
      <div className="card">
        <form id="register-form" data-validate ref={formRef} onSubmit={onSubmit}>
          <div className="row-4">
            <div>
              <label>RUN (sin puntos ni guion)</label>
              <input name="run" data-rule="required|run|min:0" placeholder="19011022K" />
            </div>
            <div>
              <label>Nombre</label>
              <input name="nombre" data-rule="required|maxlen:50" />
            </div>
            <div>
              <label>Apellidos</label>
              <input name="apellidos" data-rule="required|maxlen:100" />
            </div>
            <div>
              <label>Correo</label>
              <input name="correo" data-rule="required|email-domain|maxlen:100" placeholder="usuario@duoc.cl" />
            </div>
          </div>

          <div className="row-3">
            <div>
              <label>Fecha Nacimiento</label>
              <input type="date" name="fecha" />
            </div>

            <div>
              <label>Región</label>
              <select
                id="region"
                name="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="" disabled>Selecciona una región</option>
                {regiones.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Comuna</label>
              <select
                id="comuna"
                name="comuna"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                disabled={!region}
              >
                <option value="" disabled>
                  {region ? "Selecciona una comuna" : "Primero elige una región"}
                </option>
                {comunas.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label>Dirección</label>
            <input name="direccion" data-rule="required|maxlen:300" />
          </div>

          <div className="actions">
            <button className="btn" type="submit">Crear cuenta</button>
          </div>
        </form>
      </div>
    </div>
  );
}
