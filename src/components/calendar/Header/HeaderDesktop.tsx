'use client';

import React, { useState, useEffect } from "react";
import useCalendarNavigation from "@/hooks/useCalendarNavigation";
import HeaderSection from "./HeaderSection";
import NotificationSystem from "../../NotificationSystem"; // 🔔 Import del sistema de notificaciones

interface HeaderDesktopProps {
  year: number;
  month: number;
  day: number;
  onChangeMonth: (newMonth: number) => void;
  onChangeYear: (newYear: number) => void;
  onChangeDate: (newDate: number) => void;
  view: "month" | "week" | "day";
  onViewChange: {
    handleMonthView: () => void;
    handleWeekView: () => void;
    handleDayView: () => void;
  };
}

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default function HeaderDesktop({
  year: initialYear,
  month: initialMonth,
  day: initialDay,
  onChangeMonth,
  onChangeYear,
  onChangeDate,
  view,
  onViewChange,
}: HeaderDesktopProps) {
  const {
    year,
    month,
    date,
    handlePrev,
    handleNext,
    handleToday,
    isPrevDisabled,
    isNextDisabled,
    getWeekRange,
  } = useCalendarNavigation({
    initialYear,
    initialMonth,
    initialDate: initialDay,
    view,
    onChangeMonth,
    onChangeYear,
    onChangeDate,
  });

  const { start, end } = getWeekRange();

  return (
    <header className="flex items-center justify-between w-full px-4 py-2 bg-white shadow-sm border-b border-gray-200">
      {/* ⬅️ Sección de navegación (Anterior, Hoy, Siguiente) */}
      <HeaderSection
        buttons={[
          { label: "Anterior", onClick: handlePrev, disabled: isPrevDisabled },
          { label: "Hoy", onClick: handleToday, disabled: false },
          { label: "Siguiente", onClick: handleNext, disabled: isNextDisabled },
        ]}
      />

      {/* 🗓️ Título dinámico según la vista */}
      <div className="text-lg font-semibold text-gray-800">
        {view === "month" && `${monthNames[month]} ${year}`}
        {view === "week" && `${monthNames[month]} ${start.getDate()} - ${end.getDate()}`}
        {view === "day" && `${monthNames[month]} ${date}`}
      </div>

      {/* 🔔 Sistema de notificaciones + botones de vista */}
      <div className="flex items-center gap-4">
        <NotificationSystem />

        <HeaderSection
          buttons={[
            { label: "Mes", onClick: onViewChange.handleMonthView, disabled: view === "month" },
            { label: "Semana", onClick: onViewChange.handleWeekView, disabled: view === "week" },
            { label: "Día", onClick: onViewChange.handleDayView, disabled: view === "day" },
          ]}
        />
      </div>
    </header>
  );
}