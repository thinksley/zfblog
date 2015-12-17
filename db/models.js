var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
module.exports = {
    User:{ //����User������ģ��
        username:{type:String,required:true},//�û���
        password:{type:String,required:true},//����
        email:{type:String,required:true},//����
        avatar:{type:String,required:true}//ͷ��
    },
    Article: { //�������µ�����ģ��
        user:{type:ObjectId,ref:'User'}, //�û�
        title: String, //����
        content: String, //����

        createAt:{type: Date, default: Date.now} //����ʱ��
    }
}