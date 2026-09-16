export default function SystemStatus() {
  return (
    <div className="border border-white/10 rounded-xl bg-white/[0.02] px-5 py-4 font-mono text-sm">
      <p className="text-white/60">
        <span className="text-green-400">●</span> SISTEMA OPERATIVO
      </p>
      <p className="mt-1 text-white/40">COFIWORK // Estudio Digital</p>
      <p className="mt-3 text-white/60">
        <span className="text-white">SERVICIOS ACTIVOS</span>
      </p>
      <div className="mt-2 space-y-1 text-white/40">
        <p>► Tu web hecha a medida</p>
        <p>► Diseño que atrae clientes</p>
        <p>► Funciona en cualquier celular</p>
        <p>► Te encuentran cuando te buscan</p>
        <p>► Contacto directo por WhatsApp</p>
      </div>
    </div>
  );
}