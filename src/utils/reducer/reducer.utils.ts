import {AnyAction} from 'redux';

type Matchable<AC extends ()=> AnyAction>= AC & {
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>
}

export function withMatcher<AC extends ()=> AnyAction & {type:string}>(actionCreator: AC): Matchable<AC>

export function withMatcher<AC extends (...args: any[])=> AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>

export function withMatcher(actionCreator: Function){
    const type= actionCreator().type;
    return Object.assign(actionCreator, { 
        type,
        match(action: AnyAction){
           return action.type===type;
        }
    }
    )
}
/*
the withMatcher function is a function that returns the actionCreator function.
 {
actionCreator that orginally looked like this:
    const fetchCategoriesStart= () => {return {type, payload}};

and now actionCreator will look like this:
    const fetchCategoriesStart= () => {return {type: actionCreator().type, match(action){ return action.type===type}}}
}







El tipo matchable es aquel tipo de variable o funcion, que es un AnyAction (objeto de un {string: any}) y ademas de esto
tiene otras propiedades como type y ademas el metodo funcion match.
entonces es como que se veras asi:
matchable es {
    string: any, 
    type: ReturnType<AC que es la funcion estricta de createAction> su returnType pues es una funcion llamada createAction
    match = ()=>{}

-----AC extends ()=> AnyAction    -AnyAction can have a bunch of other properties. could be payload, other tags from saga . anyaction can have any 
number of fields 

}
*/
export type ActionWithPayload<T, P>={
    type: T,
    payload: P;
}

export type Action<T>= {
    type: T;
}



export function createAction<T extends string, P>(type:T, payload:P): ActionWithPayload<T, P>

export function createAction<T extends string>(type:T, payload:void): Action<T>

export function createAction<T extends string, P>(type: T, payload: P){return {type, payload}}

