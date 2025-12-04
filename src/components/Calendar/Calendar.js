// components/Calendar/Calendar.js
import { useState } from 'react';
import './Calendar.css';

function Calendar({ onDateSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const handleDayClick = (day) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        
        setSelectedDay(day);
        onDateSelect(dateStr);
    };

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        setSelectedDay(null);
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
        setSelectedDay(null);
    };

    const goToday = () => {
        const today = new Date();
        setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
        handleDayClick(today.getDate());
    };

    const renderDays = () => {
        const days = [];
        const totalDays = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        const today = new Date();

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= totalDays; day++) {
            const isToday = day === today.getDate() && 
                           currentMonth.getMonth() === today.getMonth() &&
                           currentMonth.getFullYear() === today.getFullYear();
            
            const isSelected = day === selectedDay;
            
            days.push(
                <div 
                    key={day}
                    className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevMonth} className="nav-btn">◀</button>
                <h3>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                <button onClick={nextMonth} className="nav-btn">▶</button>
            </div>
            
            <div className="calendar-weekdays">
                {weekdays.map(day => (
                    <div key={day} className="weekday">{day}</div>
                ))}
            </div>
            
            <div className="calendar-days">
                {renderDays()}
            </div>
            
            <button onClick={goToday} className="btn-today">
                Today
            </button>
        </div>
    );
}

export default Calendar;