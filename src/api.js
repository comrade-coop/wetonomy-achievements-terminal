
export const sendPostAction = (action) => {
    if(window.StrongForce)
        window.StrongForce.postMessage(action);
    else throw new Error('Not in mobile app');
}