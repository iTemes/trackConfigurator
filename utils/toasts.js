export default function createToast(
    {
        name = 'Уведомление', time = 'Только что',
        text = '', img = null, delay = 10000, autohide = true, alert = false,
    },
    toastsArr,
) {
    const objToToast = {
        img,
        name,
        time,
        text,
        delay,
        autohide,
        alert,
    };
    toastsArr.push(objToToast);
}
