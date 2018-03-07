import plusnew from 'index';
import reconciler from 'instances/reconciler';
import component from 'components/factory';
import elementTypeChecker from 'util/elementTypeChecker';

describe('checking if reconciler works as expected', () => {
  describe('update()', () => {
    beforeEach(() => {
      spyOn(reconciler, 'isSameAbstractElement').and.returnValue(true);
    });
    it('unknown element', () => {
      expect(() => {
        reconciler.update('string', { type: 'foo' } as any);
      }).toThrow(new Error('Updating unknown Elementtype'));
    });
  });

  describe('isSameAbstractElement()', () => {
    describe('placeholder elements', () => {
      describe('placeholder', () => {
        it('placeholder same as placeholder', () => {
          expect(reconciler.isSameAbstractElement(false, false)).toBe(true);
        });

        it('placeholder same as array', () => {
          expect(reconciler.isSameAbstractElement(false, [])).toBe(false);
        });

        it('placeholder same as dom', () => {
          expect(reconciler.isSameAbstractElement(false, <div />)).toBe(false);
        });

        it('placeholder same as component', () => {
          const Component = component(() => ({}), () => <div />);
          expect(reconciler.isSameAbstractElement(false, <Component />)).toBe(false);
        });
      });

      describe('dom', () => {
        it('same as placeholder', () => {
          expect(reconciler.isSameAbstractElement(<div />, false)).toBe(false);
        });

        it('same as array', () => {
          expect(reconciler.isSameAbstractElement(<div />, [])).toBe(false);
        });

        it('same as dom, of equal type', () => {
          expect(reconciler.isSameAbstractElement(<div />, <div />)).toBe(true);
        });

        it('same as dom, of unequal type', () => {
          expect(reconciler.isSameAbstractElement(<div />, <span />)).toBe(false);
        });

        it('same as dom, of equal type, with same key', () => {
          expect(reconciler.isSameAbstractElement(<div key="0" />, <div key="0" />)).toBe(true);
        });

        it('same as dom, of equal type, with different key', () => {
          expect(reconciler.isSameAbstractElement(<div key="0" />, <div key="1" />)).toBe(false);
        });

        it('same as dom, of equal type, with one key', () => {
          expect(reconciler.isSameAbstractElement(<div key="0" />, <div />)).toBe(false);
        });

        it('same as dom, of equal type, with one key', () => {
          expect(reconciler.isSameAbstractElement(<div />, <div key="0" />)).toBe(false);
        });

        it('same as component', () => {
          const Component = component(() => ({}), () => <div />);
          expect(reconciler.isSameAbstractElement(false, <Component />)).toBe(false);
        });
      });

      describe('component', () => {
        const Component = component(() => ({}), () => <div />);
        const AnotherComponent = component(() => ({}), () => <div />);

        it('are components the same', () => {
          expect(reconciler.isSameAbstractElement(<Component />, <Component />)).toBe(true);
        });

        it('are components the same with same key', () => {
          expect(reconciler.isSameAbstractElement(<Component key={1} />, <Component key={1} />)).toBe(true);
        });

        it('are components the same with different key', () => {
          expect(reconciler.isSameAbstractElement(<Component key={1} />, <Component key={2} />)).toBe(false);
        });

        it('are different components the same', () => {
          expect(reconciler.isSameAbstractElement(<Component />, <AnotherComponent />)).toBe(false);
        });

        it('are different components the same with same key', () => {
          expect(reconciler.isSameAbstractElement(<Component key={1} />, <AnotherComponent key={1} />)).toBe(false);
        });

        it('are different components the same with different key', () => {
          expect(reconciler.isSameAbstractElement(<Component key={1} />, <AnotherComponent key={2} />)).toBe(false);
        });

        it('are components the same as dom', () => {
          expect(reconciler.isSameAbstractElement(<Component />, <div />)).toBe(false);
        });

        it('are components the same as placeholder', () => {
          expect(reconciler.isSameAbstractElement(<Component />, false)).toBe(false);
        });

        it('are components the same as text', () => {
          expect(reconciler.isSameAbstractElement(<Component />, 'text')).toBe(false);
        });
      });
    });
  });

  describe('isSameAbstractElementType()', () => {
    beforeEach(() => {
      spyOn(elementTypeChecker, 'isPlaceholderElement').and.returnValue(false);
      spyOn(elementTypeChecker, 'isTextElement').and.returnValue(false);
      spyOn(elementTypeChecker, 'isArrayElement').and.returnValue(false);
      spyOn(elementTypeChecker, 'isFragmentElement').and.returnValue(false);
      spyOn(elementTypeChecker, 'isDomElement').and.returnValue(false);
      spyOn(elementTypeChecker, 'isComponentElement').and.returnValue(false);

    });
    it('unknown element', () => {
      expect(() => {
        (reconciler as any).isSameAbstractElementType('string', 'another string');
      }).toThrow(new Error('Unknown abstractElement detected'));
    });
  });
});