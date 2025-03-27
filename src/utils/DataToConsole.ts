export default function inputDataToConsole(formElement: HTMLElement): void {
    const data: Record<string, any> = {};
    const inputs = formElement.querySelectorAll('input');
    inputs.forEach(input => {
        data[input.id] = input.value;
    });
    console.log(data);
    alert('Выведены в консоль данные с формы!');
};
