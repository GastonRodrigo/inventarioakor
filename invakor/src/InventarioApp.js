import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const productos = [
  '90/40', '84/08', '84/14', 'Tornillos 8x2', 'Tornillos 8x1x1/4', 
  'Cincha', 'Cocodrilos', 'Streech', 'ZigZag', 'Vinculos', 
  'Chapas ZigZag', 'Cierre Natural', 'Cierre Negro', 'Deslizadores', 
  'Cola', 'Cemento de Contacto'
];

const InventarioApp = () => {
  const [inventario, setInventario] = useState({});
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [tipoMovimiento, setTipoMovimiento] = useState('ingreso');
  const [movimientos, setMovimientos] = useState([]);
  const [productoFiltrado, setProductoFiltrado] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const inventarioInicial = {};
    productos.forEach(producto => {
      inventarioInicial[producto] = 0;
    });
    setInventario(inventarioInicial);
  }, []);

  const manejarMovimiento = () => {
    if (!productoSeleccionado || !cantidad) return;

    const cantidadNumerica = parseInt(cantidad);
    const nuevaCantidad = tipoMovimiento === 'ingreso' 
      ? inventario[productoSeleccionado] + cantidadNumerica
      : inventario[productoSeleccionado] - cantidadNumerica;

    setInventario({
      ...inventario,
      [productoSeleccionado]: nuevaCantidad
    });

    const nuevoMovimiento = {
      fecha: new Date().toLocaleString(),
      producto: productoSeleccionado,
      cantidad: cantidadNumerica,
      tipo: tipoMovimiento
    };

    setMovimientos([nuevoMovimiento, ...movimientos]);

    setProductoSeleccionado('');
    setCantidad('');
  };

  const filtrarMovimientos = (producto) => {
    setProductoFiltrado(producto === productoFiltrado ? null : producto);
  };

  const movimientosFiltrados = productoFiltrado
    ? movimientos.filter(m => m.producto === productoFiltrado)
    : movimientos;

  const manejarAutenticacion = () => {
    if (password === 'akor2024') {
      setAutenticado(true);
    } else {
      alert('Contraseña incorrecta');
    }
  };

  if (!autenticado) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-purple-600 mb-4">Acceso a Inventario</h2>
          <input 
            type="password" 
            className="p-2 mb-4 w-full rounded-lg bg-gray-100 border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Ingrese la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={manejarAutenticacion}
            className="w-full p-2 rounded-lg bg-purple-500 text-white shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
          >
            Ingresar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center text-purple-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Inventario App
      </motion.h1>
      
      <motion.div 
        className="flex flex-wrap gap-4 mb-8 justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <select 
          className="p-2 rounded-lg bg-white shadow-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={productoSeleccionado} 
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Seleccionar producto</option>
          {productos.map(producto => (
            <option key={producto} value={producto}>{producto}</option>
          ))}
        </select>
        <input 
          type="number" 
          className="p-2 rounded-lg bg-white shadow-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={cantidad} 
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
        />
        <select 
          className="p-2 rounded-lg bg-white shadow-md border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={tipoMovimiento} 
          onChange={(e) => setTipoMovimiento(e.target.value)}
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
        <button 
          onClick={manejarMovimiento}
          className="p-2 rounded-lg bg-purple-500 text-white shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
        >
          Registrar
        </button>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Inventario Actual</h2>
          <div className="bg-white p-4 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-200">
                  <th className="text-left p-2">Producto</th>
                  <th className="text-right p-2">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(inventario).map(([producto, cantidad]) => (
                  <motion.tr 
                    key={producto}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`border-b border-purple-100 hover:bg-purple-50 transition duration-300 cursor-pointer ${productoFiltrado === producto ? 'bg-purple-100' : ''}`}
                    onClick={() => filtrarMovimientos(producto)}
                  >
                    <td className="p-2">{producto}</td>
                    <td className="text-right p-2">{cantidad}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">
            {productoFiltrado ? `Movimientos de ${productoFiltrado}` : 'Todos los Movimientos'}
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-lg max-h-96 overflow-y-auto overflow-x-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white">
                <tr className="border-b border-purple-200">
                  <th className="text-left p-2">Fecha</th>
                  <th className="text-left p-2">Producto</th>
                  <th className="text-right p-2">Cantidad</th>
                  <th className="text-right p-2">Tipo</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {movimientosFiltrados.map((movimiento, index) => (
                    <motion.tr 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-purple-100 hover:bg-purple-50 transition duration-300"
                    >
                      <td className="p-2">{movimiento.fecha}</td>
                      <td className="p-2">{movimiento.producto}</td>
                      <td className="text-right p-2">{movimiento.cantidad}</td>
                      <td className="text-right p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          movimiento.tipo === 'ingreso' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                        }`}>
                          {movimiento.tipo}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <footer className="mt-8 text-center text-purple-600">
        <p>&copy; 2024 AKOR Design. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default InventarioApp;
