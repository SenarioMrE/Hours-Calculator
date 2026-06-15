// import { invoke } from "@tauri-apps/api/core";

// let greetInputEl: HTMLInputElement | null;
// let greetMsgEl: HTMLElement | null;



// نکته: برای اجرا در مرورگر، این فایل باید به js کامپایل شود.

interface TimeObject {
    mm: number; // Months (approx 30 days)
    dd: number; // Days
    hh: number; // Hours
    min: number; // Minutes
    ss: number; // Seconds
}

function getTimeValues(containerId: string): TimeObject {
    const container = document.getElementById(containerId)!;
    return {
        mm: parseInt((container.querySelector('.mm') as HTMLInputElement).value) || 0,
        dd: parseInt((container.querySelector('.dd') as HTMLInputElement).value) || 0,
        hh: parseInt((container.querySelector('.hh') as HTMLInputElement).value) || 0,
        min: parseInt((container.querySelector('.min') as HTMLInputElement).value) || 0,
        ss: parseInt((container.querySelector('.ss') as HTMLInputElement).value) || 0
    };
}

function setAnswerValues(time: TimeObject): void {
    const container = document.getElementById('answer-time')!;
    (container.querySelector('.mm') as HTMLInputElement).value = time.mm.toString().padStart(2, '0');
    (container.querySelector('.dd') as HTMLInputElement).value = time.dd.toString().padStart(2, '0');
    (container.querySelector('.hh') as HTMLInputElement).value = time.hh.toString().padStart(2, '0');
    (container.querySelector('.min') as HTMLInputElement).value = time.min.toString().padStart(2, '0');
    (container.querySelector('.ss') as HTMLInputElement).value = time.ss.toString().padStart(2, '0');
}

function toTotalSeconds(t: TimeObject): number {
    // فرض بر ماه‌های ۳۰ روزه برای سادگی محاسبات
    return t.ss + (t.min * 60) + (t.hh * 3600) + (t.dd * 86400) + (t.mm * 2592000);
}

function fromTotalSeconds(totalSeconds: number): TimeObject {
    let seconds = Math.abs(totalSeconds);
    const mm = Math.floor(seconds / 2592000);
    seconds %= 2592000;
    const dd = Math.floor(seconds / 86400);
    seconds %= 86400;
    const hh = Math.floor(seconds / 3600);
    seconds %= 3600;
    const min = Math.floor(seconds / 60);
    const ss = seconds % 60;

    return { mm, dd, hh, min, ss };
}

document.getElementById('add-btn')?.addEventListener('click', () => {
    const t1 = toTotalSeconds(getTimeValues('first-time'));
    const t2 = toTotalSeconds(getTimeValues('second-time'));
    setAnswerValues(fromTotalSeconds(t1 + t2));
});

document.getElementById('sub-btn')?.addEventListener('click', () => {
    const t1 = toTotalSeconds(getTimeValues('first-time'));
    const t2 = toTotalSeconds(getTimeValues('second-time'));
    setAnswerValues(fromTotalSeconds(t1 - t2));
});




