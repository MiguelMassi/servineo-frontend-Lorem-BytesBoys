import React from "react";

interface AppointmentSummaryModalProps {
  open: boolean;
  onClose: () => void;
  data: {
    title: string;
    name: string;
    date: string;
    time: string;
    modality: "virtual" | "presential";
    locationOrLink: string;
    description?: string;
    errorCause?: string;                // Nueva propiedad para mostrar errores
    channelsSent?: string[];            // canales enviados
    channelsFailed?: string[];          // canales fallidos
  };
}

const AppointmentSummaryModal: React.FC<AppointmentSummaryModalProps> = ({ open, onClose, data }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto p-6 z-10">
        
        {/* Icono de éxito o error */}
        <div className="flex flex-col items-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
            data.errorCause ? "bg-red-100" : "bg-green-100"
          }`}>
            {data.errorCause ? (
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 text-center">{data.title}</h2>
        </div>

        {/* Información de la cita */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Nombre:</span>
            <span>{data.name}</span>
          </div>
          {data.date && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Fecha:</span>
              <span>{data.date}</span>
            </div>
          )}
          {data.time && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Hora:</span>
              <span>{data.time}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-medium text-gray-500">Modalidad:</span>
            <span>{data.modality === "virtual" ? "Virtual" : "Presencial"}</span>
          </div>
          {data.locationOrLink && (
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-500">
                {data.modality === "virtual" ? "🔗 Enlace:" : "Ubicación:"}
              </span>
              <span className="text-right break-words max-w-[60%]">{data.locationOrLink}</span>
            </div>
          )}

          {data.description && (
            <div>
              <span className="font-medium text-gray-500 block mb-1">Descripción:</span>
              <p className="bg-gray-100 rounded p-2 text-sm">{data.description}</p>
            </div>
          )}

          {data.errorCause && (
            <div className="mb-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-700 font-medium text-sm">Causa del error:</p>
              <p className="text-red-600 text-sm">{data.errorCause}</p>
            </div>
          )}
         {/* NUEVO: Listas de canales enviados y fallidos */}  
         {(data.channelsSent || data.channelsFailed) && (
            <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {data.channelsSent && data.channelsSent.length > 0 && (
                <div className="mb-2">
                  <p className="text-green-600 font-medium text-sm">Canales enviados:</p>
                  <ul className="list-disc list-inside text-green-600 text-sm">
                    {data.channelsSent.map((channel, index) => (
                      <li key={index}>{channel}</li>
                    ))}
                  </ul>
                </div>
              )}
              {data.channelsFailed && data.channelsFailed.length > 0 && (
                <div>
                  <p className="text-red-600 font-medium text-sm">Canales fallidos:</p>
                  <ul className="list-disc list-inside text-red-600 text-sm">
                    {data.channelsFailed.map((channel, index) => (
                      <li key={index}>{channel}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botón Aceptar */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#2B6AE0] text-white rounded hover:brightness-110 text-sm font-medium"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSummaryModal;
