import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEvents } from "../context/EventContext";
import { FloatButton, Modal } from "antd";

function CalendarPageV2() {
  const { getEvents, createEvent, events } = useEvents();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (values) => {
    createEvent(values);
    setOpen(false);
  });

  useEffect(() => {
    getEvents();
  }, []);
 
  return (
    <div className="flex flex-row bg-gray-100">
      <main className="main flex flex-col flex-grow md:ml-0 transition-all duration-150 ease-in mx-auto">
        <div className="flex flex-col flex-grow rounded mt-4 ">
          {/* Boton con formulario flotante */}
          <FloatButton onClick={() => setOpen(true)} tooltip="Crear Grupo" />
          <Modal
            centered
            open={open}
            onCancel={() => setOpen(false)}
            footer={[
              <button
                key="save"
                type="submit"
                onClick={() => setOpen(false)}
                className="mr-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cerrar
              </button>,
              <button
                key="save"
                type="submit"
                onClick={onSubmit}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Guardar
              </button>,
            ]}
          >
            <h1 className="font-bold text-2xl text-gray-700">Crear Evento</h1>
            <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-6 mt-3">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-first-name"
                  >
                    Nombre del Evento
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name"
                    type="text"
                    placeholder="Ingrese el nombre del evento"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <p className="text-red-500">El evento es requerido</p>
                  )}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-last-name"
                  >
                    Descripcion
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-last-name"
                    type="text"
                    placeholder="Ingrese la descripción del evento"
                    {...register("description")}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 ">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Fecha de inicio
                  </label>
                  <input
                    type="date"
                    name="start"
                    {...register("start")}
                    className="w-full px-4 py-3 rounded-lg text-black bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-3"
                    htmlFor="grid-password"
                  >
                    Fecha de fin
                  </label>
                  <input
                    type="date"
                    name="end"
                    {...register("end")}
                    className="w-full px-4 py-3 rounded-lg text-black bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </form>
          </Modal>
        </div>

        <div className="main-content flex flex-col flex-grow p-4">
          <div className="flex flex-col flex-grow rounded mt-4">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default CalendarPageV2;
