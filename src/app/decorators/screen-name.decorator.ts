export function ScreenName(config: { name: string } | string): ClassDecorator {
    return function (target) {
        target.prototype['screenName'] = typeof config === 'string' ? config : config.name;
    };
}
