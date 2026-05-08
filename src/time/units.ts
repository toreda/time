import type {TimeUnit} from './unit';

/**
 * Set of all canonical, supported `TimeUnit` values. Used by core
 * functions to validate that a value is a real `TimeUnit` (not an
 * alias). For alias→canonical resolution, see `timeUnitFromAlias`.
 *
 * @category Time Units
 */
export const timeUnits = new Set<TimeUnit>(['μs', 'ms', 's', 'm', 'h', 'd', 'w', 'mo', 'y']);
