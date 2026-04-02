
'use client';

import React, { useState, useEffect } from "react";
import useCalendarNavigation from "@/hooks/useCalendarNavigation";
import HeaderSection from "./HeaderSection";
import NotificationSystem from "../../NotificationSystem";

interface HeaderDesktopProps {
  year: number;
  month: number;
  day: number;
  onChangeMonth: (newMonth: number) => void;
  onChangeYear: (newYear: number) => void;
  onChangeDate: (newDate: number) => void;
  view: 'month' | 'week' | 'day';
  onViewChange: {
    handleMonthView: () => void;
    handleWeekView: () => void;
    handleDayView: () => void;
  }
}

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

export default function HeaderDesktop({
  year: initialYear,
  month: initialMonth,
  day: initialDay,
  onChangeMonth,
  onChangeYear,
  onChangeDate,
  view,
  onViewChange
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
    getWeekRange
  } = useCalendarNavigation({
    initialYear,
    initialMonth,
    initialDate: initialDay,
    view,
    onChangeMonth,
    onChangeYear,
    onChangeDate
  });

  const { start, end } = getWeekRange();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* 🗓️ Sección de título de calendario */}
      <div className="text-xl font-semibold text-gray-800">
        {view === 'month' && `${monthNames[month]} ${year}`}
        {view === 'week' && `${monthNames[month]} ${start.getDate()} - ${end.getDate()}`}
        {view === 'day' && `${monthNames[month]} ${date}`}
      </div>

      {/* 🔔 Notificaciones */}
      <div className="flex items-center gap-4">
        <NotificationSystem />
      </div>
    </header>
  );
}
