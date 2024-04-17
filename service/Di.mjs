
export class Di
{
    static userData = {};

    setData(data)
    {
        Di.userData = data;
    }

    getData()
    {
        return Di.userData;
    }
}

