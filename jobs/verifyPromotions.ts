import cron from 'node-cron';
import { Promocion } from '../models';

//cada dia a las 24 horas verificar la validez de las promociones.
export const promotionSchedule = cron.schedule('00 00 * * * *', async() => {
    
    const fechaActual = new Date();
    const promociones:Array<any> = await Promocion.find({estado : true});
    
    promociones.map(async (promocion)=>{
         const fechaPromo = new Date(promocion.fechaFinal);
    
        if(fechaActual >= fechaPromo){
            promocion.estado = false;
            await promocion.save();
        }
    });  
    
}, {
    scheduled : true,
    timezone : 'America/Managua'
});

