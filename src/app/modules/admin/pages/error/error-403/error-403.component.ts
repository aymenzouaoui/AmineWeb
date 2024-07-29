import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector       : 'error-403',
    templateUrl    : './error-403component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [RouterLink],
})
export class Error403Component
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
