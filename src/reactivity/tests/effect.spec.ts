import { reactive } from "../reactive";
import { effect } from "../effect"
describe('effect', () => {
    it('happy path', () => {
        const user = reactive({
            age: 10
        });
        let nextAge;
        effect(() => {
            nextAge = user.age + 1;
        })
        
        expect(nextAge).toBe(11);

        // update
        user.age++;
        expect(nextAge).toBe(12);
    });

    it('should return runner when call effect',() => {
        // effect(fn) -> 返回function 称为runner 
        // 调用function时会执行fn -> return
        let foo = 10;
        const runner = effect(() => {
            foo++;
            return 'foo'
        });

        expect(foo).toBe(11);
        const r = runner();
        expect(foo).toBe(12);
        expect(r).toBe('foo');
    });

    
})