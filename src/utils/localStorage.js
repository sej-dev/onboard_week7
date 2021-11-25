class LocalStorage{
    
    constructor({ key }){
        this._KEY = key;
    }

    get(){
        try{
            const dataStr = localStorage.getItem(this._KEY);
            return JSON.parse(dataStr);
        }
        catch(e){
            console.error(`localStorage get error, Key=${this._KEY}`);
            return {};
        }
    }

    set(data){
        try{
            const dataStr = JSON.stringify(data);
            localStorage.setItem(this._KEY, dataStr);
        }
        catch(e){
            console.error(`localStorage set error, Key=${this._KEY}`);
        }
    }

    remove(){
        try{
            localStorage.removeItem(this._KEY);
        }
        catch(e){
            console.error(`localStorage remove error, Key=${this._KEY}`);
        }
    }

    get key(){
        return this._KEY;
    }
}

export default LocalStorage;