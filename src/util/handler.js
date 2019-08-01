import {Message} from 'iview';
export function loading(){
  Message.loading({content:'loading...', duration: 0});
}
export function clear(){
  Message.destroy();
}
export function success(info){
  Message.destroy();
  Message.success({content:info, duration: 2})
}
export function error(err){
  Message.destroy();
  Message.error({content:err, duration: 3});
}