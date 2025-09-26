'use client';

import { createViaje, StateViajeForm } from "@/app/lib/actions/viajeAction";
import { Camion, Tarifa, TarifaAdicional, TipoCamion, Zona } from "@/app/lib/data/definitions";
import { BoltIcon, CalculatorIcon, CalendarIcon, ChatBubbleBottomCenterIcon, CurrencyDollarIcon, FlagIcon, IdentificationIcon, MapIcon, SunIcon, TruckIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import { Button } from "@/app/components/button";
import { formatDate } from "@/app/lib/utils/formatDateToLocal";

export default function CreateViajeForm ({ 
  zonas, 
  tipos, 
  camiones, 
  tarifas, 
  tarifasAdicionales 
}: { 
      zonas: Zona[],
      tipos: TipoCamion[], 
      camiones: Camion[], 
      tarifas: Tarifa[], 
      tarifasAdicionales: TarifaAdicional[] 
    }) {

  const initialState: StateViajeForm = { message: null, errors: {} };
  const [state, formAction] = useActionState(createViaje, initialState);
  const [fecha, setFecha] = useState(new Date());
  const [zonaId, setZonaId] = useState('');
  const [tipoId, setTipoId] = useState('');
  const [cajones, setCajones] = useState(0);
  const [cantClientes, setCantClientes] = useState(0);
  const [montoCentavos, setMontoCentavos] = useState(0);
  const [observaciones, setObservaciones] = useState('');
  const [camion, setCamion] = useState('');
  const [litros, setLitros] = useState(0);
  const [km, setKm] = useState(0);

  // Si la cantidad de clientes es mayor a 4, se suma un monto adicional
  function getMontoAdicional(): number {
    const cantExtra = cantClientes - 4;
    if (cantExtra <= 0) return 0;

    const adicional = tarifasAdicionales.find(t => t.cantidad === cantExtra);
    if (adicional) {
      return Number(adicional.monto_centavos) * cantExtra; 
    }
    return 0;
  }


  function handleMontoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const montoEnPesos = parseFloat(inputValue);
    if (!isNaN(montoEnPesos)) {
      const newMonto = Math.round(montoEnPesos * 100 + getMontoAdicional()); // Se guarda en centavos
      setMontoCentavos(newMonto); 
    } else {
      setMontoCentavos(0);
    } 
  }

  function updateDefaultMonto() {
    if (tipoId !== '' && zonaId !== '') {
      const result = tarifas.find(tarifa =>
        tipoId === tarifa.tipo_camion_id &&
        zonaId === tarifa.zona_id
      );
      if (result) {
        const baseMonto = Number(result.monto_centavos);
        const adicional = getMontoAdicional();
        const defaultMonto = baseMonto + adicional;
        setMontoCentavos(Math.round(defaultMonto));
      }
    }
  }


  function restoreLastOptionSelected (optionId: string) {
    const option = document.getElementById(optionId) as HTMLOptionElement;
    if (option) {
      option.selected = true;   
    }
  }

  function resetAlert () {
    state.message = '';
  }

  useEffect(() => {
    restoreLastOptionSelected(zonaId);
    restoreLastOptionSelected(tipoId);
    restoreLastOptionSelected(camion);

    if (zonaId !== '' && tipoId !== '') updateDefaultMonto(); 

  }, [zonaId, tipoId, camion, cantClientes, state.errors]);

  useEffect(() => {
    if (state?.success) {
      setFecha(new Date());
      setCajones(0);
      setCantClientes(0);
      setObservaciones('');
      setLitros(0);
      setKm(0);
      setTipoId('');
      setZonaId('');
      setCamion('');
      setMontoCentavos(0);
    }
  }, [state?.success]);

  return (
    <form action={ formAction } onChange={resetAlert}>
      <div className="rounded-md bg-gray-800 p-4 md:p-6">
        
        {/* Fecha */}
        <div className="mb-4">
          <label htmlFor="fecha" className="mb-2 block text-sm font-medium">
            Fecha
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="fecha"
                name="fecha"
                type="date"
                value={formatDate(fecha)}
                onChange={(e) => setFecha(new Date(e.target.value))}
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="fecha-error"
              /> 
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
            </div>
          </div>
          <div id="fecha-error" aria-live="polite" aria-atomic="true">
            {state.errors?.fecha &&
              state.errors.fecha.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>        

        {/* Zona */}
        <div className="mb-4">
          <label htmlFor="zona" className="mb-2 block text-sm font-medium">
            Zona
          </label>
          <div className="relative">
            <select
              id="zona"
              name="zona"
              className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
              value={zonaId}
              onChange={ e => setZonaId(e.target.value) }
              aria-describedby="zona-error"
            >
              <option value="" disabled className="bg-gray-800">
                Seleccione una zona
              </option>
              {zonas.map((zona) => (
                <option id={zona.id} key={zona.id} value={ zona.id } className="bg-gray-800" >
                  {zona.nombre}
                </option>
              ))}
            </select>
            <FlagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
          </div>
          <div id="zona-error" aria-live="polite" aria-atomic="true">
            {state.errors?.zona &&
              state.errors.zona.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Tipo de camion */}
        <div className="mb-4">
          <label htmlFor="tipo" className="mb-2 block text-sm font-medium">
            Tipo de camión
          </label>
          <div className="relative">
            <select
              id="tipo"
              name="tipo"
              className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
              value={ tipoId }
              onChange={e => setTipoId(e.target.value)}
              aria-describedby="tipo-error"
            >
              <option value="" disabled className="bg-gray-800">
                Seleccione un tipo
              </option>
              {tipos.map((tipo) => (
                <option id={ tipo.id } key={tipo.id} value={tipo.id} className="bg-gray-800">
                  {tipo.tipo}
                </option>
              ))}
            </select>
            <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
          </div>
          <div id="tipo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.tipo_camion &&
              state.errors.tipo_camion.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Cajones */}
        <div className="mb-4">
          <label htmlFor="cajones" className="mb-2 block text-sm font-medium">
            Cantidad de cajones
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cajones"
                name="cajones"
                type="number"
                step="1"
                placeholder="Ingrese una cantidad válida"
                value={cajones}
                onChange={e => setCajones(Number(e.target.value))}
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="cajones-error"
              />
              <CalculatorIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="cajones-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cajones &&
              state.errors.cajones.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Cantidad de clientes */ }
        <div className="mb-4">
          <label htmlFor="cant-clientes" className="mb-2 block text-sm font-medium">
            Cantidad de clientes
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cant-clientes"
                name="cant-clientes"
                type="number"
                step="1"
                placeholder="Ingrese una cantidad válida"
                value={cantClientes}
                onChange={e => setCantClientes(Number(e.target.value))}
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="cant-clientes-error"
              />
              <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="cant-clientes-error" aria-live="polite" aria-atomic="true">
            {state.errors?.cant_clientes &&
              state.errors.cant_clientes.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Monto del viaje */}
        <div className="mb-4">
          <label htmlFor="monto" className="mb-2 block text-sm font-medium">
            Valor del flete. Modifique el monto si es necesario
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="monto"
                name="monto"
                type="number"
                step="0.01"
                placeholder="Ingrese un monto en ARS"
                value={montoCentavos / 100}
                onChange={handleMontoChange}
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="monto-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="monto-error" aria-live="polite" aria-atomic="true">
            {state.errors?.monto &&
              state.errors.monto.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Observaciones */}
        <div className="mb-4">
          <label htmlFor="observaciones" className="mb-2 block text-sm font-medium">
            Ingrese alguna observación
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="observaciones"
                name="observaciones"
                type="text"
                placeholder="Ingrese alguna observacion"
                value={observaciones}
                onChange={e => setObservaciones(e.target.value)}
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="observaciones-error"
              />
              <ChatBubbleBottomCenterIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
            </div>
          </div>
          <div id="observaciones-error" aria-live="polite" aria-atomic="true">
            {state.errors?.observaciones &&
              state.errors.observaciones.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Camion */}
        <div className="mb-4">
          <label htmlFor="camion" className="mb-2 block text-sm font-medium">
            Camión
          </label>
          <div className="relative">
            <select
              id="camion"
              name="camion"
              className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
              value={ camion }
              onChange={ e => setCamion(e.target.value) }
              aria-describedby="camion-error"
            >
              <option value="" disabled className="bg-gray-800">
                Seleccione un camión
              </option>
              {camiones.map((camion) => (
                <option id={ camion.id } key={camion.id} value={camion.id} className="bg-gray-800">
                  {camion.patente}
                </option>
              ))}
            </select>
            <TruckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-300 peer-focus:text-gray-500" />
          </div>
          <div id="camion-error" aria-live="polite" aria-atomic="true">
            {state.errors?.camion &&
              state.errors.camion.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Litros de combustible */}
        <div className="mb-4">
          <label htmlFor="litros" className="mb-2 block text-sm font-medium">
            Litros de combustible
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="litros"
                name="litros"
                type="number"
                step="0.01"
                placeholder="Ingrese una cantidad válida"
                value={litros}
                onChange={e => setLitros(parseFloat(e.target.value))}
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="litros-error"
              />
              <BoltIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="litros-error" aria-live="polite" aria-atomic="true">
            {state.errors?.litros_combustible &&
              state.errors.litros_combustible.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Kilometraje */}
        <div className="mb-4">
          <label htmlFor="km" className="mb-2 block text-sm font-medium">
            Kilometraje
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="km"
                name="km"
                type="number"
                step="0.01"
                placeholder="Ingrese un kilometraje válido"
                value={km}
                onChange={e => setKm(parseFloat(e.target.value))}
                className="peer block w-full rounded-md py-2 pl-10 text-sm outline placeholder:text-gray-500 focus:border-sky-500 focus:outline focus:outline-sky-500"
                aria-describedby="km-error"
              />
              <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="km-error" aria-live="polite" aria-atomic="true">
            {state.errors?.kilometraje &&
              state.errors.kilometraje.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Alertas generales */ }
        <div id="fields-error" aria-live="polite" aria-atomic="true">
          {state.message ? 
            (state.success ?
              // Aviso de viaje guardado exitosamente
              <p className="mt-2 text-sm text-green-500"> {state.message} </p> 
              :
              // Alerta de error en algun campo
              <p className="mt-2 text-sm text-red-500"> {state.message} </p> 
            )
            : 
            null}
        </div> 
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/viajes"
          className="flex h-10 items-center rounded-lg bg-gray-500 px-4 text-sm font-medium text-gray-50 transition-colors hover:bg-sky-800"
        >
          Cancelar
        </Link>
        <Button type="submit">Agregar Viaje</Button>
      </div>
    </form>
  )
} 