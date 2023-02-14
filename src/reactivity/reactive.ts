import { track,trigger } from "./effect";
export function reactive(raw){
    // write core function
    return new Proxy(raw,{
        get(target, key){ 
            // {foo:1}
            //target指向当前这个对象{foo:1}，key是获取到的用户访问的key foo
            const res = Reflect.get(target, key);

            // 依赖收集
            track(target,key);
            return res;
        },

        set(target, key, value){
            const res = Reflect.set(target, key, value);
            
            // 触发依赖
            trigger(target,key)
            return res;
        }
    })
}